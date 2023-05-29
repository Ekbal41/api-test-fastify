"use strict";

const path = require("path");
const AutoLoad = require("@fastify/autoload");
const mongoose = require("mongoose");

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {
  logger: true,
};

mongoose.connect(
  "mongodb+srv://asifekbal:asifekbal2023@asifekbal-api.yqo3ivf.mongodb.net/?retryWrites=true&w=majority",
  {},
)
  .then(() => {
    console.log("MongoDB connected…");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

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
