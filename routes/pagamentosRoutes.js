const express = require("express");
const router = express.Router();

//importando funcao do controller
const atualiza_pagamento = require("../controllers/atm_pag_controller.js");


router.post("/baixa_versao_pagamento", atualiza_pagamento) 

module.exports = router;