const express = require("express");
const enseignantController = require("../Controllers/Enseignants.controller");

const router = express.Router();

router.post("/addProf", enseignantController.createProf);
router.get("/allProfessors", enseignantController.getAllProfessors);
router.get("/profById/:id", enseignantController.getProfById);
router.put("/updateProf/:id", enseignantController.updateProf);
router.delete("/deleteProf/:id", enseignantController.deleteProf);
router.post("/addProfessors", enseignantController.createMultipleProfessors);


module.exports = router;

