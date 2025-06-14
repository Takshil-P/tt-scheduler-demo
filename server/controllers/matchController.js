import Player from "../models/Player.js";
import Match from "../models/Match.js";

// Schedule matches for Round 1
// export const scheduleMatches = async (req, res) => {
//   try {
//     const players = await Player.find();
//     if (players.length < 2) {
//       return res
//         .status(400)
//         .json({ error: "At least 2 players are required to schedule matches" });
//     }

//     const totalSlots = Math.pow(2, Math.ceil(Math.log2(players.length)));
//     const byesNeeded = totalSlots - players.length;

//     const shuffledPlayers = players.sort(() => Math.random() - 0.5);

//     const matches = [];
//     let playerIndex = 0;

//     for (let i = 0; i < byesNeeded; i++) {
//       const match = new Match({
//         player1: shuffledPlayers[playerIndex]._id,
//         player2: null,
//         round: 1,
//         isGivenBye: true,
//       });
//       matches.push(match);
//       playerIndex++;
//     }

//     while (playerIndex < shuffledPlayers.length - 1) {
//       const match = new Match({
//         player1: shuffledPlayers[playerIndex]._id,
//         player2: shuffledPlayers[playerIndex + 1]._id,
//         round: 1,
//         isGivenBye: false,
//       });
//       matches.push(match);
//       playerIndex += 2;
//     }

//     await Match.insertMany(matches);

//     res.status(201).json({ message: "Matches scheduled for Round 1", matches });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const scheduleMatches = async (req, res) => {
  try {
    const players = await Player.find();
    if (players.length < 2) {
      return res
        .status(400)
        .json({ error: "At least 2 players are required to schedule matches" });
    }

    const totalSlots = Math.pow(2, Math.ceil(Math.log2(players.length)));
    const byesNeeded = totalSlots - players.length;

    const shuffledPlayers = players.sort(() => Math.random() - 0.5);

    const matches = [];
    let playerIndex = 0;

    // Assign byes and set winner immediately
    for (let i = 0; i < byesNeeded; i++) {
      const match = new Match({
        player1: shuffledPlayers[playerIndex]._id,
        player2: null,
        round: 1,
        isGivenBye: true,
        winner: shuffledPlayers[playerIndex]._id, // Set winner to player1
      });
      matches.push(match);
      playerIndex++;
    }

    // Pair remaining players
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

















// in this code we are not updating the match winner, so winner:false was there so we are commenting this code.
// Update a match (e.g., set the winner)
// export const updateMatch = async (req, res) => {
//   try {
//     const { matchId } = req.params;
//     const { winnerId } = req.body;

//     const match = await Match.findById(matchId);
//     if (!match) {
//       return res.status(404).json({ error: "Match not found" });
//     }

//     if (match.isGivenBye) {
//       match.winner = match.player1;
//     } else {
//       if (
//         winnerId !== match.player1.toString() &&
//         winnerId !== match.player2.toString()
//       ) {
//         return res
//           .status(400)
//           .json({ error: "Winner must be one of the players in the match" });
//       }
//       match.winner = winnerId;
//     }

//     await match.save();
//     const updatedMatch = await Match.findById(matchId)
//       .populate("player1", "name")
//       .populate("player2", "name")
//       .populate("winner", "name");

//     res.status(200).json({ message: "Match updated", match: updatedMatch });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };




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












// Schedule the next round based on winners of the previous round
// export const scheduleNextRound = async (req, res) => {
//   try {
//     // Find the highest round currently in the database
//     const lastRoundMatch = await Match.findOne().sort({ round: -1 });
//     if (!lastRoundMatch) {
//       return res
//         .status(400)
//         .json({ error: "No matches found. Schedule Round 1 first." });
//     }

//     const currentRound = lastRoundMatch.round;
//     const previousRoundMatches = await Match.find({
//       round: currentRound,
//     }).populate("winner");
//     console.log("Current Round:", currentRound);
//     console.log("Previous Round Matches:", previousRoundMatches);

//     // Get winners of the previous round
//     const winners = previousRoundMatches
//       .filter((match) => match.winner) // Only include matches with a winner
//       .map((match) => match.winner);
//     // Remove duplicates (in case of data inconsistency)
//     const uniqueWinners = [
//       ...new Set(winners.map((winner) => winner._id.toString())),
//     ].map((winnerId) =>
//       winners.find((winner) => winner._id.toString() === winnerId)
//     );
//     console.log("Winners:", uniqueWinners);
//     console.log("Winners Count:", uniqueWinners.length);

//     // Check if the tournament has concluded
//     if (uniqueWinners.length === 1) {
//       console.log("Tournament should conclude");
//       return res.status(200).json({
//         message: "Tournament concluded",
//         winner: uniqueWinners[0], // Populated winner object with name
//       });
//     }

//     // Check if there are not enough winners to proceed
//     if (uniqueWinners.length < 2) {
//       console.log("Not enough winners error triggered");
//       return res
//         .status(400)
//         .json({ error: "Not enough winners to schedule the next round" });
//     }

//     // Schedule the next round
//     const nextRound = currentRound + 1;
//     const matches = [];
//     for (let i = 0; i < uniqueWinners.length - 1; i += 2) {
//       const match = new Match({
//         player1: uniqueWinners[i]._id,
//         player2: uniqueWinners[i + 1]._id,
//         round: nextRound,
//         isGivenBye: false,
//       });
//       matches.push(match);
//     }

//     const savedMatches = await Match.insertMany(matches);

//     res.status(201).json({
//       message: `Matches scheduled for Round ${nextRound}`,
//       matches: savedMatches,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// Schedule the next round based on winners of the previous round
// export const scheduleNextRound = async (req, res) => {
//   try {
//     const lastRoundMatch = await Match.findOne().sort({ round: -1 });
//     if (!lastRoundMatch) {
//       return res
//         .status(400)
//         .json({ error: "No matches found. Schedule Round 1 first." });
//     }

//     const currentRound = lastRoundMatch.round;
//     const previousRoundMatches = await Match.find({
//       round: currentRound,
//     }).populate("winner");

//     const winners = previousRoundMatches
//       .filter((match) => match.winner)
//       .map((match) => match.winner);
//     const uniqueWinners = [
//       ...new Set(winners.map((winner) => winner._id.toString())),
//     ].map((winnerId) =>
//       winners.find((winner) => winner._id.toString() === winnerId)
//     );

//     if (uniqueWinners.length === 1) {
//       return res.status(200).json({
//         message: "Tournament concluded",
//         winner: uniqueWinners[0],
//       });
//     }

//     if (uniqueWinners.length < 2) {
//       return res
//         .status(400)
//         .json({ error: "Not enough winners to schedule the next round" });
//     }

//     const nextRound = currentRound + 1;
//     const matches = [];
//     const totalSlots = Math.pow(2, Math.ceil(Math.log2(uniqueWinners.length)));
//     const byesNeeded = totalSlots - uniqueWinners.length;

//     // Shuffle winners to randomize pairings
//     const shuffledWinners = uniqueWinners.sort(() => Math.random() - 0.5);
//     let winnerIndex = 0;

//     // Assign byes if needed
//     for (let i = 0; i < byesNeeded; i++) {
//       const match = new Match({
//         player1: shuffledWinners[winnerIndex]._id,
//         player2: null,
//         round: nextRound,
//         isGivenBye: true,
//       });
//       matches.push(match);
//       winnerIndex++;
//     }

//     // Pair remaining winners
//     while (winnerIndex < shuffledWinners.length - 1) {
//       const match = new Match({
//         player1: shuffledWinners[winnerIndex]._id,
//         player2: shuffledWinners[winnerIndex + 1]._id,
//         round: nextRound,
//         isGivenBye: false,
//       });
//       matches.push(match);
//       winnerIndex += 2;
//     }

//     const savedMatches = await Match.insertMany(matches);

//     res.status(201).json({
//       message: `Matches scheduled for Round ${nextRound}`,
//       matches: savedMatches,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// Schedule the next round based on winners of the previous round




//in this code bye players are not considered as winners,that's why we are commenting this code.



// export const scheduleNextRound = async (req, res) => {
//   try {
//     const lastRoundMatch = await Match.findOne().sort({ round: -1 });
//     if (!lastRoundMatch) {
//       return res
//         .status(400)
//         .json({ error: "No matches found. Schedule Round 1 first." });
//     }

//     const currentRound = lastRoundMatch.round;
//     const previousRoundMatches = await Match.find({
//       round: currentRound,
//     }).populate("winner");

//     const winners = previousRoundMatches
//       .filter((match) => match.winner)
//       .map((match) => match.winner);
//     const uniqueWinners = [
//       ...new Set(winners.map((winner) => winner._id.toString())),
//     ].map((winnerId) =>
//       winners.find((winner) => winner._id.toString() === winnerId)
//     );

//     if (uniqueWinners.length === 1) {
//       return res.status(200).json({
//         message: "Tournament concluded",
//         winner: uniqueWinners[0],
//       });
//     }

//     if (uniqueWinners.length < 2) {
//       return res
//         .status(400)
//         .json({ error: "Not enough winners to schedule the next round" });
//     }

//     const nextRound = currentRound + 1;
//     const matches = [];
//     const totalSlots = Math.pow(2, Math.ceil(Math.log2(uniqueWinners.length)));
//     const byesNeeded = totalSlots - uniqueWinners.length;

//     const shuffledWinners = uniqueWinners.sort(() => Math.random() - 0.5);
//     let winnerIndex = 0;

//     // Assign byes and set winner immediately
//     for (let i = 0; i < byesNeeded; i++) {
//       const match = new Match({
//         player1: shuffledWinners[winnerIndex]._id,
//         player2: null,
//         round: nextRound,
//         isGivenBye: true,
//         winner: shuffledWinners[winnerIndex]._id, // Set winner to player1
//       });
//       matches.push(match);
//       winnerIndex++;
//     }

//     // Pair remaining winners
//     while (winnerIndex < shuffledWinners.length - 1) {
//       const match = new Match({
//         player1: shuffledWinners[winnerIndex]._id,
//         player2: shuffledWinners[winnerIndex + 1]._id,
//         round: nextRound,
//         isGivenBye: false,
//       });
//       matches.push(match);
//       winnerIndex += 2;
//     }

//     const savedMatches = await Match.insertMany(matches);

//     // Populate matches for response
//     const populatedMatches = await Match.find({ round: nextRound })
//       .populate("player1", "name")
//       .populate("player2", "name")
//       .populate("winner", "name");

//     res.status(201).json({
//       message: `Matches scheduled for Round ${nextRound}`,
//       matches: populatedMatches,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





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
    const missingWinners = previousRoundMatches.filter((match) => !match.winner);
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
    let winnerIndex = 0;

    // Assign byes and set winner immediately
    for (let i = 0; i < byesNeeded; i++) {
      const match = new Match({
        player1: shuffledWinners[winnerIndex]._id,
        player2: null,
        round: nextRound,
        isGivenBye: true,
        winner: shuffledWinners[winnerIndex]._id,
      });
      matches.push(match);
      winnerIndex++;
    }

    // Pair remaining winners
    while (winnerIndex < shuffledWinners.length - 1) {
      const match = new Match({
        player1: shuffledWinners[winnerIndex]._id,
        player2: shuffledWinners[winnerIndex + 1]._id,
        round: nextRound,
        isGivenBye: false,
      });
      matches.push(match);
      winnerIndex += 2;
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
    res.status(200).json({ message: "Tournament reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
