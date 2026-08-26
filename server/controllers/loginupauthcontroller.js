import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if fields are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    // User not found
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare entered password with stored password hash
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    // Incorrect password
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Login successful
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};