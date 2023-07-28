const { createExtractorFromFile } = require("node-unrar-js");

//******************************************************************** */
//Exemplo
// descompactarArquivoRar(
//   "C:\\Users\\fabio.dias.PERTO\\Desktop\\Dev\\setupcli\\apisss.rar",
//   "C:\\temp"
// );
//********************************************************************* */
module.exports = class descompacta {
  static descompactarArquivoRar = async (arquivo, destino) => {
    try {
      // Create the extractor with the file information (returns a promise)
      const extractor = await createExtractorFromFile({
        filepath: arquivo,
        targetPath: destino,
      });

      // Extract the files
      [...extractor.extract().files];

      console.log("Conteudo extraido com sucesso");
    } catch (err) {
      // May throw UnrarError, see docs
      console.error("Erro ao extrair arquivo");
    }
  };
};

// descompactarArquivoRar(
//   "C:\\Users\\fabio.dias.PERTO\\Desktop\\Dev\\setupcli\\apisss.rar",
//   "C:\\temp"
// );

//    async function extractRarArchive(file, destination) {
//   try {
//     // Create the extractor with the file information (returns a promise)
//     const extractor = await createExtractorFromFile({
//       filepath: file,
//       targetPath: destination
//     });

//     // Extract the files
//     [...extractor.extract().files];

//     console.log("Conteudo extraido com sucesso");
//   } catch (err) {
//     // May throw UnrarError, see docs
//     console.error(err);
//   }
// }

// Files are put directly into the destination
// The full path of folders are created if they are missing
// extractRarArchive("C:\\Users\\fabio.dias.PERTO\\Downloads\\ApiAccess.rar", "~/Desktop/files");
