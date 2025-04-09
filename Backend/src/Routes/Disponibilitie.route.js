const express = require("express");
const router = express.Router();
const DispControllers = require("../Controllers/Disponibilite.controller");

router.get("/getAll", DispControllers.getAllDisp);
router.get("/getDispoByProf", DispControllers.getDispByProf);
router.post("/create", DispControllers.createDisponibilite);
router.put("/update/:id", DispControllers.updateDisponibilite);
router.delete("/delete/:id", DispControllers.deleteDisponibilite);

module.exports = router;