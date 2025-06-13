import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Player name is required"],
    trim: true,
  },
  rank: {
    type: Number,
    default: null, // Optional rank for seeding
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Player = mongoose.model("Player", playerSchema);

export default Player;