import express from "express";
import { getUsers, userSignIn, userSignUp } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/", getUsers);

export default router;
