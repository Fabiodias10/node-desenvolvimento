const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const ff = require("fs");
const { type } = require("os");
const { Stream } = require("stream");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
module.exports = class baixar_drive {
  static authorize = () => {
    const promise_authorize = new Promise(async (resolve, reject) => {
      let client = await loadSavedCredentialsIfExist();
      if (client) {
        resolve(client);
      } else {
        client = authenticate({
          scopes: SCOPES,
          keyfilePath: CREDENTIALS_PATH,
        });
        if (client.credentials) {
          saveCredentials(client);
        }
        resolve(client);
      }
    });
    return promise_authorize;
  };

  /**
   * @param {OAuth2Client} authClient An authorized OAuth2 client.
   * Lists the names and IDs of up to 10 files.
   */
  static listFiles = (authClient) => {
    const promise_list = new Promise(async (resolve, reject) => {
      const drive = google.drive({ version: "v3", auth: authClient });
      const res = await drive.files.list({
        // pageSize: 100,
        // fields: 'nextPageToken, files(id, name)',
      });
      const files = res.data.files;
      if (files.length === 0) {
        console.log("No files found.");
        reject("No files found.");
        return;
      }
      var fabio = [];
      // console.log("Files:");
      files.map((file) => {
        fabio.push(`${file.name} --> ${file.id}`);
        // console.log(`${file.name} (${file.id})`);
      });
      resolve(fabio);
    });
    return promise_list;
  };

  static baixaArquivo = async (authClient, fileId, destino, extensao, nome) => {

    const promise_baixa = new Promise(async(resolve, reject) => {
      const drive = google.drive({ version: "v3", auth: authClient });
      const destStream = ff.createWriteStream(`${destino}\\${nome}${extensao}`);
      
      drive.files.get(
        { fileId, alt: "media" },
        { responseType: "stream" },
        (err, res) => {
          if (err) {
            // console.error(`UTILS Error downloading file: ${err.message}`);
  
            reject( "Erro ao realizar o download!!");
            return
          }
          // Copia o stream de leitura para o stream de gravação
          
          // destStream.on('connection',(Stream)=>{console.log("connectadoooooo")})
          
          destStream.on('pipe',()=>{
             console.log("pipeeeeeeeee");
             resolve("resolvendoBaixa")
            })
            destStream.on("drain",()=>{
  console.log("drain");
})
destStream.on("open",()=>{
  console.log("open");
})
destStream.on("ready",()=>{
  console.log("ready");
})
destStream.on("unpipe",()=>{
  console.log("unpipe");
})

// destStream.("drain",()=>{
//   console.log("drain");
// })

res.data.pipe(destStream);
  
          // Fecha o stream de gravação quando o download for concluído
          destStream.on("finish", () => {
            
            console.log(`Sucesso no download do arquivo ${nome}`);
            resolve("estou no finish")
            // resolve(`${destino}${extensao}`); //demora mais que 30 segundos, encerrando o lado do cliente
            //  process.exit()
          });
  
          // destStream.on("close", ()=>{
          //   console.log("fechadoo");
          //   process.exit()
          // })
          
        }
      )
    })
    return promise_baixa;

  };

  static verificaConclusao = (start)=>{
    new Promise((resolve, reject) => {
      resolve ("pronto finalizado haha")
    })

  }

  // const dest =  ff.createWriteStream(`${__dirname}/api_mobile.rar`);

  // var fileId = "1C9edBi5aKllKOdDlLxVS32sY3PTHhjFn"; //api mobile

  // // Montar o sistema de arquivos do Google Drive
  // const destStream = ff.createWriteStream(`${__dirname}/teste_baixa_arquivos_drive`);

  // drive.files.get(
  //   { fileId, alt: "media" },
  //   { responseType: "stream" },
  //   (err, res) => {
  //     if (err) {
  //       console.error(`Error downloading file: ${err.message}`);
  //       return;
  //     }
  //     // Copia o stream de leitura para o stream de gravação
  //     res.data.pipe(destStream);
  //     // Fecha o stream de gravação quando o download for concluído
  //     destStream.on("finish", () => {
  //       console.log(`File downloaded to `);
  //     });
  //   }
  // );
};

// module.exports = {authorize, listFiles}

// authorize().then(listFiles).catch(console.error);
