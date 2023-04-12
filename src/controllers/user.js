import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ message: `User already exist.` });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const SECRET = process.env.SECRET;
    const token = jwt.sign(
      {
        payload,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    return res.send({ user, token });
  } catch (error) {
    return res.send({ status: error.name, message: error.message });
  }
};

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ message: `User doesn't exist` });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.send({ message: `Wrong Password` });
    }

    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const SECRET = process.env.SECRET;
    const token = jwt.sign(
      {
        payload,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    return res.send({ user, token });
  } catch (error) {
    return res.send({ status: error.name, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    return res.send({ status: error.name, message: error.message });
  }
};
