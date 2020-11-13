// Servidor de Express
const express = require('express');
// Servidor de sockets
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {

  constructor() {

    this.app = express();
    this.port = process.env.PORT || 8080;

    // Http Server
    this.server = http.createServer(this.app);
    // Configuraciones de socket
    // Configuracion de socket server

    this.io = socketio(this.server, { /* configuraciones */});
  }

  middlewares() {
    // Desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')));
  }

  configurarSockets() {
    // En javascript todo pasa por referencia el io de server es el mismo que se usa en socket
    new Sockets( this.io );
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();
    
    // Inicializar sockets
    this.configurarSockets();
    // Inicializar server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto', this.port);
    })
  }
}



module.exports = Server;