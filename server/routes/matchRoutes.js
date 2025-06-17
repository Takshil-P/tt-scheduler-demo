import express from "express";
import {
  scheduleMatches,
  getMatches,
  updateMatch,
  scheduleNextRound,
  resetTournament,
  dropAllPlayers,
} from "../controllers/matchController.js";

const router = express.Router();

// Schedule matches for Round 1
router.post("/matches/schedule", scheduleMatches);

// Get all matches
router.get("/matches", getMatches);

// Update a match (e.g., set the winner)
router.patch("/matches/:matchId", updateMatch);

// Schedule the next round
router.post("/matches/next-round", scheduleNextRound);

// Reset the tournament
router.delete("/matches/reset", resetTournament);

// Drop all players
router.delete("/players/drop-all", dropAllPlayers);

export default router;
