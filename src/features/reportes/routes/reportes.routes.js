const express = require("express");
const router = express.Router();

const reportesController = require("../controller/reportes.controller");

router.get("/", reportesController.obtenerReportes);
router.post("/", reportesController.crearReporte);

module.exports = router;