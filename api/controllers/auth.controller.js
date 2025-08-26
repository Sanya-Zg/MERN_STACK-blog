import User from '../models/user.model.js';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errors.js';
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import jwt from 'jsonwebtoken';
import generatedOTP from '../utils/generatedOTP.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Checking if fields are empty
    const fields = [
      { name: 'Username', value: username },
      { name: 'Email', value: email },
      { name: 'Password', value: password },
    ];

    const emptyFields = fields
      .filter((field) =>
        validator.isEmpty(field.value || '', { ignore_whitespace: true })
      )
      .map((field) => field.name);
    if (emptyFields.length > 0) {
      return next(
        errorHandler(
          400,
          `${emptyFields.join(' and ')} ${
            emptyFields.length > 1 ? 'are' : 'is'
          } required`
        )
      );
    }

    // Check if 'username' exist
    const userName = await User.findOne({ username });
    if (userName) {
      return next(errorHandler(400, 'This username already exists'));
    }

    // Checking if 'email' is valid
    if (!validator.isEmail(email)) {
      return next(errorHandler(400, 'Email is not valid'));
    }

    // Check if 'email' exist
    const user = await User.findOne({ email });
    if (user) {
      return next(errorHandler(400, 'Email already in use'));
    }

    // Checking if password length more than 5 symbols
    if (password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }

    // Hashed the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create and save user in DB
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const save = await newUser.save();

    // Sending verification email
    const verifyEmailUrl = `${process.env.FRONTEND_URI}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: 'Verify email from SanyaBlog',
      html: verifyEmailTemplate({
        username,
        url: verifyEmailUrl,
      }),
    });

    return res
      .status(201)
      .json({ success: true, message: 'User created successfully!' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)[0].message,
      });
    }
    return next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { code } = req.body;

    // Check if verify code exists
    if (!code) {
      return next(errorHandler(400, 'Verification code is required'));
    }

    const user = await User.findOne({ _id: code });

    if (!user) {
      return next(errorHandler(400, 'Invalid code'));
    }

    user.isVerified = true;

    // Saving changes to the DB
    await user.save();

    return res.json({
      message: 'Verify email done',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if fields are fill in
    if (!email || !password) {
      return next(errorHandler(400, 'All fields are required!'));
    }

    // Check if user's email is in DB
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, 'Wrong credentials'));
    }

    // Check if password is valid
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return next(errorHandler(400, 'Wrong credentials'));
    }

    // Create token (jwt)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const { password: pass, ...rest } = user._doc;

    return res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  console.log('REQ BODY:', req.body);
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(400, 'Email is not available'));
    }

    const otp = generatedOTP();
    const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1hr

    await User.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: expireTime,
    });

    await sendEmail({
      sendTo: email,
      subject: 'Forgot password from Blog APP',
      html: forgotPasswordTemplate({
        name: user.username,
        otp: otp,
      }),
    });

    return res.json({
      message: 'Check your email',
      success: true,
    });
  } catch (error) {
    return next(errorHandler(500, error.message || error));
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next(errorHandler(400, 'Email and OTP fields are required'));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(400, 'Email not available'));
    }

    const currentTime = new Date();

    if (otp !== user.forgot_password_otp) {
      return next(errorHandler(400, 'Invalid OTP'));
    }

    if (user.forgot_password_expiry < currentTime) {
      return next(errorHandler(400, 'OTP has expired'));
    }

    await User.findByIdAndUpdate(user?._id, {
      forgot_password_otp: '',
      forgot_password_expiry: '',
    });

    return res.json({
      message: 'OTP verification successful',
      success: true,
    });
  } catch (error) {
    return next(errorHandler(500, error.message || error));
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return next(errorHandler(400, 'All fields must be filled in'));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(400, 'Email is not available'));
    }

    if (newPassword !== confirmPassword) {
      return next(errorHandler(400, 'Passwords do not match'));
    }

    if (newPassword.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: 'Password updated successfully',
      success: true,
    });
  } catch (error) {
    return next(errorHandler(500, error.message || error));
  }
};
