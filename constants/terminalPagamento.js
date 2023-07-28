const os = require('os')

// console.log(os.homedir());
const caminhoUser = os.homedir()
module.exports = {
  ID: "1MJaboGsTlyecmmk6SoZuMi1PIUmgnWkv", // id contabilidade
  // ID: "1C9edBi5aKllKOdDlLxVS32sY3PTHhjFn", // id contabilidade
  // destinoBaixa: `${caminhoUser}\\Downloads`,
  destinoBaixa: `C:/temp`,
  extensao:".rar",

  //descompacta
  arquivoDescompacta:"",
  destinoFInal:""

}