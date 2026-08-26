import { Router } from "express";
import { signup } from "../controllers/SignupauthController.js";
import { loginUser } from "../controllers/loginupauthcontroller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", loginUser);

export default router;