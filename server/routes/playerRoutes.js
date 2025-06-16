import express from "express";
import { addPlayer, getPlayers, getShuffledPlayers } from "../controllers/playerController.js";

const router = express.Router();

// Add a new player
router.post("/players", addPlayer);

// Get all players
router.get("/players", getPlayers);

// Get shuffled players
router.get("/shuffled-players", getShuffledPlayers);

export default router;