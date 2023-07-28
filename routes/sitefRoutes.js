const express = require("express");
const router = express.Router();

//importando funcao do controller
const sitefController = require("../controllers/sitef_controller");

router.get("/ler-clisitef", sitefController.dados_clisitef);
router.post("/altera-clisitef", sitefController.sitef_AlteraCom) //{porta:, mensagem:}

module.exports = router;
