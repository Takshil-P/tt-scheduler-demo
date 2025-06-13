import express from "express";
import { scheduleMatches, getMatches } from "../controllers/matchController.js";

const router = express.Router();

// Schedule matches for Round 1
router.post("/matches/schedule", scheduleMatches);

// Get all matches
router.get("/matches", getMatches);

export default router;