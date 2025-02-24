const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const db = require("./DataBase");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(bodyParser.json());





//middleware
const etudiantRoutes = require('./Routes/Etudiant.route');
app.use('/student', etudiantRoutes);

const enseignantRoutes = require('./Routes/Enseignant.route');
app.use('/prof', enseignantRoutes);




// Test MySQL connection when server starts
db.query("SELECT 1", (err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Database connected successfully");
  }
});

const port = 8000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
