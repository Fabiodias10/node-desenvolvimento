// const { listFiles } = require("../utils/baixar_drive");
const { listFiles, baixaArquivo, authorize } = require("../utils/baixar_drive");
const baixar_drive = require("../utils/baixar_drive");
const terminalPagamento = require('../constants/terminalPagamento')

module.exports = class drive_controller {
  static listaArquivosDrive = (req, res) => {
    const fabio = async () => {
      const w = await baixar_drive.authorize();
      const q = await baixar_drive.listFiles(w);
      res.json({ w, q });
    };
    fabio();
  };

  static baixaArquivoDrive = (req, res) => {
const { fileId, nome} = req.body;
const destino = terminalPagamento.destinoBaixa
const extensao = terminalPagamento.extensao
    const dias = async () => {
      try {
        const z = await baixar_drive.authorize();
        const v = await baixar_drive.listFiles(z);
        const x = await baixar_drive.baixaArquivo(z, fileId, destino, extensao, nome);
        console.log("Resolve da baixa ",x);
        res.json({
          // autorizacao: z,
          // lista: v,
          resposta: x,
          
        });
      } catch (error) {
        res.status(500).json({
          Erro: error,
          erro:"estou no erro"
        });
      }
    };
    dias();
  };

  static statusBaixa = (req, res)=>{
    const {statusReal} = req.body
    const henrique = async () => {
      try {
        
        
        res.json({
          // autorizacao: z,
          // lista: v,
          resposta: statusReal,
          
        });
      } catch (error) {
        res.status(500).json({
          Erro: error,
          erro:"estou no erro"
        });
      }
    };
    henrique();
  

  }
};

// .catch((erro) => {
//   res.status(500).json({
//     erro: "erro"
//   })
// })
