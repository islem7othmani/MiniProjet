const express = require("express");
const cors = require("cors");
//const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  credentials: true, 
}));


app.use(bodyParser.json());

const port = 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});