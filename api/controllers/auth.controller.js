import { User } from '../models/user.model.js';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errors.js';
import sendEmail from '../config/sendEmail.js'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';

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

    // const verifyEmail = await sendEmail({
    //   sendTo: email,
    //   subject: 'Verify email from SanyaBlog',
    //   html: verifyEmailTemplate({
    //     username,
    //     url: verifyEmailUrl,
    //   }),
    // });

    return res.status(201).json({ success: true, message: 'User created successfully!' });

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
