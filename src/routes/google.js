import express from "express";
import { googleAuth, googleRefreshToken } from "../controllers/google.js";

const router = express.Router();

router.post("/google", googleAuth);
router.post("/google/refresh-token", googleRefreshToken);

export default router;
