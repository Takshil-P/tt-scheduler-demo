import Player from "../models/Player.js";
import Match from "../models/Match.js";

// Schedule matches for Round 1
export const scheduleMatches = async (req, res) => {
  try {
    // Fetch all players
    const players = await Player.find();
    if (players.length < 2) {
      return res
        .status(400)
        .json({ error: "At least 2 players are required to schedule matches" });
    }

    // Calculate the number of players needed for a perfect bracket (next power of 2)
    const totalSlots = Math.pow(2, Math.ceil(Math.log2(players.length)));
    const byesNeeded = totalSlots - players.length;

    // Shuffle players to randomize matchups (optional)
    const shuffledPlayers = players.sort(() => Math.random() - 0.5);

    // Create matches for Round 1
    const matches = [];
    let playerIndex = 0;

    // Assign byes first (if any)
    for (let i = 0; i < byesNeeded; i++) {
      const match = new Match({
        player1: shuffledPlayers[playerIndex]._id,
        player2: null,
        round: 1,
        isGivenBye: true,
      });
      matches.push(match);
      playerIndex++;
    }

    // Create real matches for remaining players
    while (playerIndex < shuffledPlayers.length - 1) {
      const match = new Match({
        player1: shuffledPlayers[playerIndex]._id,
        player2: shuffledPlayers[playerIndex + 1]._id,
        round: 1,
        isGivenBye: false,
      });
      matches.push(match);
      playerIndex += 2;
    }

    // Save all matches to the database
    await Match.insertMany(matches);

    res.status(201).json({ message: "Matches scheduled for Round 1", matches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all matches
export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("player1", "name")
      .populate("player2", "name")
      .populate("winner", "name");
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
