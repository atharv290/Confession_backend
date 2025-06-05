const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const AuthToken = require('./routes/middleware/Auth');
require("./models/config");
const router = express.Router();
const app = express();
const PORT = 5500;
const SECRET_KEY = "your-secret-key"; // use env vars in production
const saltRounds = 10;
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "https://confession-frontend.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
};
app.use(cors(corsOptions));

app.post('/logout', (req, res) => {
  res.clearCookie('Tokan'); // Clear the JWT cookie
  res.json({ message: 'Logged out successfully' });
});


const loginroute = require("./routes/loginroute");
app.use("/",loginroute);

app.get('/get', AuthToken, (req, res) => {
  res.send({Val : "Access Protected Route"});
});
const signuproute = require("./routes/signuproute");
app.use("/",signuproute);
const confessionRoute = require('./routes/confession');
app.use("/", confessionRoute);

const Confession = require('./models/confession'); // import the model

app.get('/confessions', AuthToken,async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(confessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load confessions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
