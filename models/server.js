const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.apiVersion = 'apiv1';

    // Paths
    this.paths = {
      auth: `/${this.apiVersion}/auth`,
      users: `/${this.apiVersion}/users`,
      search: `/${this.apiVersion}/search`,
      uploads: `/${this.apiVersion}/uploads`,
    }

    // DB Connection
    this.connectDb();
    // Middlewares
    this.middlewares();
    // Paths to the api endpoints
    this.routes();
  }

  async connectDb() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // Body parser
    this.app.use(express.json());
    // Public directory
    this.app.use(express.static('public'));
    // File uploads
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.users, require('../routes/user'));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.uploads, require('../routes/upload'));
  }

  listen() {
    this.app.listen(this.port, () => console.log(`Listen on port: ${this.port}!`));
  }
}

module.exports = Server;
