const cors = require("cors");
const express = require('express')
const sitefRoutes = require("./routes/sitefRoutes");
const driveRoutes = require('./routes/driveRoutes')

const app = express()
const port = 3000

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin",'http://localhost:9300');
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});


app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(sitefRoutes);
app.use(driveRoutes)



app.listen(port, () => console.log(`Servidor API rodando na porta ${port}!`))