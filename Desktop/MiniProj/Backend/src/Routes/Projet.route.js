const express = require("express");
const router = express.Router();
const projetController = require("../Controllers/Projet.controller");

router.get("/getAll", projetController.getAllProjets);
router.get("/:id", projetController.getProjetById);
router.post("/addProjet", projetController.createProjet);
router.put("/update/:id", projetController.updateProjet);
router.delete("/delete/:id", projetController.deleteProjet);

module.exports = router;