import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import playerRoutes from "./routes/playerRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TT Scheduler Backend is Running 🎾");
});

app.use("/api", playerRoutes);
app.use("/api", matchRoutes);
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
});







































































































// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// dotenv.config({ path: "D:/Final Year Project/PRACTICE1.1/tt-scheduler/.env" });

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("TT Scheduler Backend is Running 🎾");
// });

// connectDB().then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
// });
