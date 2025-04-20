const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectToDB, getDBStatus } = require("./config/db");
connectToDB();

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const authRoutes = require("./routes/auth");
const candidateRoutes = require("./routes/candidate");
const leaveRoutes = require("./routes/leave");
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/leave", leaveRoutes);

app.get("/", (req, res) => {
  console.log("Request received at root endpoint");
  res.json({
    message: "Hello, your backend is running!",
    databaseStatus: getDBStatus(),
  });
});

app.get("/debug", (req, res) => {
  res.json({
    MONGO_URI: process.env.MONGO_URI ? "Loaded" : "Not Loaded",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
