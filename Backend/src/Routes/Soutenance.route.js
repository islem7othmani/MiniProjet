const express = require("express");
const router = express.Router();
const soutenanceController = require("../Controllers/Soutenance.controller");

router.get("/getAll", soutenanceController.getAllSoutenances);
router.get("/:id", soutenanceController.getSoutenanceById);
router.post("/addSoutenance", soutenanceController.createSoutenance);
router.put("/update/:id", soutenanceController.updateSoutenance);
router.delete("/delete/:id", soutenanceController.deleteSoutenance);

module.exports = router;
