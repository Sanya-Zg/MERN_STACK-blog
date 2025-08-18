import { User } from '../models/user.model.js';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
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
      return res.status(400).json({
        success: false,
        message: `${emptyFields.join(', ')} ${
          emptyFields.length > 1 ? 'are' : 'is'
        } required`,
      });
    }

    // Check if 'username' exist
    const userName = User.findOne({username});
    if (userName) {
      return res
        .status(400)
        .json({ success: false, message: 'This username already exists' });
    }
    // Checking if 'email' is valid
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Email is not valid' });
    }

    // Check if 'email' exist
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already in use' });
    }

    // Hashed the password
    const hashedPassword = await bcryptjs.hash(password, 10)

    // Create and save user in DB
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json({ success: true, message: 'User created' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)[0].message,
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};
