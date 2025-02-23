const express = require("express");
const etudiantController = require("../Controllers/Etudiants.controller");

const router = express.Router();

router.post("/addStudent", etudiantController.createEtudiant);
router.get("/allStudents", etudiantController.getAllEtudiants);
router.get("/studentById/:id", etudiantController.getStudentById);
router.put("/updateStudent/:id", etudiantController.updateStudent);
router.delete("/deleteStudent/:id", etudiantController.deleteStudent);

module.exports = router;