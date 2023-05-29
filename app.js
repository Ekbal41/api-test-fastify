"use strict";

const path = require("path");
const AutoLoad = require("@fastify/autoload");

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {
  // logger: true,
  logger: true,
};

const app = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
  fastify.register(require("@fastify/jwt"), {
    secret: "myapissupersecret",
  });

  fastify.register(require("@fastify/view"), {
    engine: {
      ejs: require("ejs"),
    },
    root: path.join(__dirname, "templates"),
  });
};

module.exports = app;
