import mongoose from "mongoose";

const shuffledPlayerSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  name: {
    type: String,
    required: true, // Store player's name directly
  },
  position: {
    type: Number,
    required: true, // Position in shuffled array (1, 2, ..., n)
  },
  isBye: {
    type: Boolean,
    default: false, // True if player received a bye
  },
  byeOrder: {
    type: Number,
    default: 0, // 1 for first bye, 2 for second, ..., or 0 if no bye
  },
  round: {
    type: Number,
    required: true, // Round number (1, 2, etc.) to track multiple rounds
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ShuffledPlayer = mongoose.model("ShuffledPlayer", shuffledPlayerSchema);

export default ShuffledPlayer;