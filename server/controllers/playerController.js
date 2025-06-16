// import Player from "../models/Player.js";

// // Add a new player
// export const addPlayer = async (req, res) => {
//   try {
//     const { name, rank } = req.body;
//     const player = new Player({ name, rank });
//     await player.save();
//     res.status(201).json({ message: "Player added", player });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get all players
// export const getPlayers = async (req, res) => {
//   try {
//     const players = await Player.find();
//     res.status(200).json(players);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import Player from "../models/Player.js";
import ShuffledPlayer from "../models/ShuffledPlayer.js";

// Add a new player
export const addPlayer = async (req, res) => {
  try {
    const { name, rank } = req.body;
    const player = new Player({ name, rank });
    await player.save();
    res.status(201).json({ message: "Player added", player });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all players
export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get shuffled players for verification
export const getShuffledPlayers = async (req, res) => {
  try {
    const shuffledPlayers = await ShuffledPlayer.find()
      .populate("player", "name")
      .sort({ round: 1, position: 1 }); // Sort by round and position
    res.status(200).json(shuffledPlayers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};