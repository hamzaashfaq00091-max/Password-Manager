import { Router } from "express";
import { signup } from "../controllers/SignupauthController.js";
import { loginUser } from "../controllers/loginupauthcontroller.js";
import { protect } from "../middleware/authmiddleware.js";
import User from "../models/User.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", loginUser);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.userId).select("name email createdAt");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
});

export default router;