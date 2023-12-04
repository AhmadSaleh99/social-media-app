import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import user from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser) res.status(404).json({ message: "User not found" });
    const ispasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!ispasswordCorrect)
      res.status(404).json({ message: "invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    console.log(token);
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
  }
};
export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await user.findOne({ email });

    if (existingUser) res.status(400).json({ message: "User already exists" });
    if (password != confirmPassword)
      res.status(400).json({ message: "Passwords does not match" });

    const hashedPassword = await bcrypt.hash(password, 1);
    const result = await user.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test");
    console.log(token);
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
  }
};
