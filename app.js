require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const serverService = require('./src/services/server_service');

serverService.startServer(app, PORT);

module.exports = app;
module.exports.handler = serverless(app);