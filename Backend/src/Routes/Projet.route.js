const express = require("express");
const router = express.Router();
const projetController = require("../Controllers/Projet.controller");

router.get("/projets", projetController.getAllProjets);
router.get("/projets/:id", projetController.getProjetById);
router.post("/addProjet", projetController.createProjet);
router.put("/projets/:id", projetController.updateProjet);
router.delete("/projets/:id", projetController.deleteProjet);

module.exports = router;
