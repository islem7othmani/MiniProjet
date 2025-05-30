const express = require("express");
const router = express.Router();
const soutenanceController = require("../Controllers/Soutenance.controller");

router.get("/getAll", soutenanceController.getAllSoutenances);
router.post("/create", soutenanceController.createSoutenance);
router.put("/update/:id_s", soutenanceController.updateSoutenance);
router.get("/soutenanceByStudent/:id", soutenanceController.getSoutenanceByStudentId);

module.exports = router;
