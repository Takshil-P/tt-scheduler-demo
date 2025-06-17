import Player from "../models/Player.js";
import Match from "../models/Match.js";
import ShuffledPlayer from "../models/ShuffledPlayer.js";

// Helper function to assign byes in a structured order
function getStructuredByePlayers(shuffledPlayers, byesNeeded) {
  if (byesNeeded === 0) return [];

  const n = shuffledPlayers.length;
  const upperHalfSize = Math.ceil((n + 1) / 2); // (n+1)/2 for upper half
  const lowerHalfSize = n - upperHalfSize; // Remaining for lower half

  const upperHalf = shuffledPlayers.slice(0, upperHalfSize);
  const lowerHalf = shuffledPlayers.slice(upperHalfSize);

  const byePlayers = [];
  let lowerIndexStart = 0; // Start of lower half
  let lowerIndexEnd = lowerHalf.length - 1; // End of lower half
  let upperIndexStart = 0; // Start of upper half
  let upperIndexEnd = upperHalf.length - 1; // End of upper half
  let turn = 0;

  // Assign byes in the pattern: last lower, first upper, first lower, last upper, ...
  while (byePlayers.length < byesNeeded) {
    if (turn % 4 === 0 && lowerIndexEnd >= lowerIndexStart) {
      byePlayers.push(lowerHalf[lowerIndexEnd--]); // Last of lower half
    } else if (turn % 4 === 1 && upperIndexStart <= upperIndexEnd) {
      byePlayers.push(upperHalf[upperIndexStart++]); // First of upper half
    } else if (turn % 4 === 2 && lowerIndexStart <= lowerIndexEnd) {
      byePlayers.push(lowerHalf[lowerIndexStart++]); // First of lower half
    } else if (turn % 4 === 3 && upperIndexEnd >= upperIndexStart) {
      byePlayers.push(upperHalf[upperIndexEnd--]); // Last of upper half
    } else {
      console.warn("Not enough players to assign all byes. Adjusting...");
      break;
    }
    turn++;
  }

  // Log bye players for debugging
  console.log("Bye players:", byePlayers.map(p => p.name));
  return byePlayers;
}

export const scheduleMatches = async (req, res) => {
  try {
    const players = await Player.find();
    if (players.length < 2) {
      return res
        .status(400)
        .json({ error: "At least 2 players are required to schedule matches" });
    }

    // Calculate total slots and byes needed
    const totalSlots = Math.pow(2, Math.ceil(Math.log2(players.length)));
    const byesNeeded = totalSlots - players.length;

    // Shuffle players randomly
    const shuffledPlayers = players.sort(() => Math.random() - 0.5);

    // Get players who will receive byes
    const byePlayers = getStructuredByePlayers(shuffledPlayers, byesNeeded);

    // Save shuffled players to ShuffledPlayer collection
    const shuffledPlayerDocs = shuffledPlayers.map((player, index) => {
      const isBye = byePlayers.includes(player);
      const byeOrder = isBye ? byePlayers.indexOf(player) + 1 : 0;
      return {
        player: player._id,
        name: player.name, // Store player's name
        position: index + 1, // 1-based indexing
        isBye,
        byeOrder,
        round: 1,
      };
    });
    await ShuffledPlayer.insertMany(shuffledPlayerDocs);

    // Filter out players who didn't get byes
    const remainingPlayers = shuffledPlayers.filter(
      (player) => !byePlayers.includes(player)
    );

    const matches = [];

    // Assign byes and set winner immediately
    for (const player of byePlayers) {
      matches.push(
        new Match({
          player1: player._id,
          player2: null,
          round: 1,
          isGivenBye: true,
          winner: player._id,
        })
      );
    }

    // Pair remaining players
    for (let i = 0; i < remainingPlayers.length - 1; i += 2) {
      matches.push(
        new Match({
          player1: remainingPlayers[i]._id,
          player2: remainingPlayers[i + 1]._id,
          round: 1,
          isGivenBye: false,
        })
      );
    }

    // Save matches to database
    const savedMatches = await Match.insertMany(matches);

    // Populate matches for response
    const populatedMatches = await Match.find({ round: 1 })
      .populate("player1", "name")
      .populate("player2", "name")
      .populate("winner", "name");

    res.status(201).json({
      message: "Matches scheduled for Round 1",
      matches: populatedMatches,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

export const updateMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { winnerId } = req.body;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    if (match.isGivenBye) {
      if (winnerId && winnerId !== match.player1.toString()) {
        return res
          .status(400)
          .json({ error: "Winner of a bye match must be player1" });
      }
      match.winner = match.player1;
    } else {
      if (
        !winnerId ||
        (winnerId !== match.player1.toString() &&
          winnerId !== match.player2.toString())
      ) {
        return res
          .status(400)
          .json({ error: "Winner must be one of the players in the match" });
      }
      match.winner = winnerId;
    }

    await match.save();
    const updatedMatch = await Match.findById(matchId)
      .populate("player1", "name")
      .populate("player2", "name")
      .populate("winner", "name");
    res.status(200).json({ message: "Match updated", match: updatedMatch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const scheduleNextRound = async (req, res) => {
  try {
    const lastRoundMatch = await Match.findOne().sort({ round: -1 });
    if (!lastRoundMatch) {
      return res
        .status(400)
        .json({ error: "No matches found. Schedule Round 1 first." });
    }

    const currentRound = lastRoundMatch.round;
    const previousRoundMatches = await Match.find({
      round: currentRound,
    }).populate("winner player1 player2");

    // Check if all matches have winners
    const missingWinners = previousRoundMatches.filter(
      (match) => !match.winner
    );
    if (missingWinners.length > 0) {
      return res
        .status(400)
        .json({ error: "All matches in the current round must have a winner" });
    }

    const winners = previousRoundMatches.map((match) => match.winner);
    const uniqueWinners = [
      ...new Set(winners.map((winner) => winner._id.toString())),
    ].map((winnerId) =>
      winners.find((winner) => winner._id.toString() === winnerId)
    );

    if (uniqueWinners.length === 1) {
      return res.status(200).json({
        message: "Tournament concluded",
        winner: uniqueWinners[0],
      });
    }

    if (uniqueWinners.length < 2) {
      return res
        .status(400)
        .json({ error: "Not enough winners to schedule the next round" });
    }

    const nextRound = currentRound + 1;
    const matches = [];
    const totalSlots = Math.pow(2, Math.ceil(Math.log2(uniqueWinners.length)));
    const byesNeeded = totalSlots - uniqueWinners.length;

    const shuffledWinners = uniqueWinners.sort(() => Math.random() - 0.5);
    const byePlayers = getStructuredByePlayers(shuffledWinners, byesNeeded);

    // Save shuffled winners to ShuffledPlayer collection
    const shuffledPlayerDocs = shuffledWinners.map((player, index) => {
      const isBye = byePlayers.includes(player);
      const byeOrder = isBye ? byePlayers.indexOf(player) + 1 : 0;
      return {
        player: player._id,
        name: player.name, // Store player's name
        position: index + 1,
        isBye,
        byeOrder,
        round: nextRound,
      };
    });
    await ShuffledPlayer.insertMany(shuffledPlayerDocs);

    const remainingWinners = shuffledWinners.filter(
      (player) => !byePlayers.includes(player)
    );

    // Assign byes and set winner immediately
    for (const player of byePlayers) {
      matches.push(
        new Match({
          player1: player._id,
          player2: null,
          round: nextRound,
          isGivenBye: true,
          winner: player._id,
        })
      );
    }

    // Pair remaining winners
    for (let i = 0; i < remainingWinners.length - 1; i += 2) {
      matches.push(
        new Match({
          player1: remainingWinners[i]._id,
          player2: remainingWinners[i + 1]._id,
          round: nextRound,
          isGivenBye: false,
        })
      );
    }

    const savedMatches = await Match.insertMany(matches);

    // Populate matches for response
    const populatedMatches = await Match.find({ round: nextRound })
      .populate("player1", "name")
      .populate("player2", "name")
      .populate("winner", "name");
    res.status(201).json({
      message: `Matches scheduled for Round ${nextRound}`,
      matches: populatedMatches,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetTournament = async (req, res) => {
  try {
    await Match.deleteMany({});
    await ShuffledPlayer.deleteMany({}); // Clear ShuffledPlayer collection
    res.status(200).json({ message: "Tournament reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const dropAllPlayers = async (req, res) => {
  try {
    // Delete all players from the Player collection
    await Player.deleteMany({});
    // Also reset matches and shuffled players to maintain consistency
    await Match.deleteMany({});
    await ShuffledPlayer.deleteMany({});
    res.status(200).json({ message: "All players dropped and tournament reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};