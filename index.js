const Server = require('./models/server');
require('dotenv').config(); // toma la configuracion por defecto de leer el archivo .evn

const server = new Server();
server.execute();
