"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", (req, reply) => {
    reply.view("/index.ejs", { text: "text" });
  });
};
