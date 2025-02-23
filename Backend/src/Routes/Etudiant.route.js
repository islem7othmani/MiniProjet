const express = require("express");
const etudiantController = require("../Controllers/Etudiants.controller");

const router = express.Router();

router.post("/", etudiantController.createEtudiant);

module.exports = router;