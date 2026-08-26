import { Router } from "express";
import { signup } from "../controllers/SignupauthController.js";
import { loginUser } from "../controllers/loginupauthcontroller.js";
import { protect } from "../middleware/authmiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "You are authenticated",
    userId: req.userId,
  });
});

export default router;