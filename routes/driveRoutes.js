const express = require("express");
const router = express.Router();

//importando funcao do controller
const drive_controller = require("../controllers/drive_controller");



router.get("/lista_arquivo_drive", drive_controller.listaArquivosDrive) 
router.post("/baixa_arquivo_drive", drive_controller.baixaArquivoDrive)
router.post("/verificabaixaconcluida", drive_controller.statusBaixa)

module.exports = router;