const fs = require("fs");
const { pathClisitefIni } = require("../constants/constant");

module.exports = class sitefController {
  static dados_clisitef(req, res) {
    let dados;
    try {
      const data = fs.readFileSync(pathClisitefIni, "utf8");
      dados = data.split("\n");
      const porta = dados[1].split("=")[1].split("\r")[0];
      const mensagem_pinpad = dados[4].split("=")[1];

      res.status(200).json({
        porta,
        mensagem_pinpad,
      });
    } catch (error) {
      res.status(500).json({
        erronode: error,
        Erro: "Arquivo Clisitef.ini não existe!",
      });
    }
  }

  static sitef_AlteraCom = (req, res) => {
    const { porta, mensagem } = req.body;

    fs.rm(pathClisitefIni, (err) => {
      if (err) {
        console.error("Não existia, criado arquivo clisitef.ini");
      }

      try {
        fs.writeFile(
          pathClisitefIni,
          `[PinPadCompartilhado]\r\nPorta=${porta}\r\n\r\n[PinPad]\r\nMensagemPadrao=${mensagem}`,
          { enconding: "utf-8", flag: "a" },
          function (err) {
            if (err) {
              throw err;
            }
            console.log("Arquivo salvo!");
            res.status(200).json({
              Sucesso: "Arquivo alterado com sucesso!",
              porta,
              mensagem,
            });
          }
        );
      } catch (error) {
        res.status(500).json({
          erro: err,
          descricao_erro: "Não conseguiu escrever no clisitef.ini",
        });
      }
    });
  };
};
