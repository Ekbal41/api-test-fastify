// https://www.fastify.io/docs/latest/Serverless/
"use strict";

const Fastify = require("fastify");

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(import("../app.js"));

const myapp = async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = myapp;
