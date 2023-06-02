"use strict";

const User = require("../../models/user");

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/get-key",

    schema: {
      summery: "Get key",
      description: "Get key",
      tags: ["User"],
      querystring: {
        e: { type: "string" },
        p: { type: "string" },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            key: { type: "string" },
          },
        },
        401: {
          description: "Unauthorized",
          type: "object",
          properties: {
            code: { type: "number" },
            message: { type: "string" },
          },
        },
      },
    },

    handler: (req, reply) => {
      const { email, password } = req.query;
      if (email === "" || password === "") {
        reply.code(401).send({
          code: 401,
          message: "You must provide email and password",
        });
      }
      const isRegisterded = User.findOne({ email, password });
      const key = fastify.jwt.sign({ email });
      if (isRegisterded) {
        reply.code(200).send({ key });
      }
    },
  });
  fastify.route({
    method: "GET",
    url: "/register",

    schema: {
      summery: "Create user",
      description: "Create user",
      tags: ["User"],
      querystring: {
        e: { type: "string" },
        p: { type: "string" },
        n: { type: "string" },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        401: {
          description: "404",
          type: "object",
          properties: {
            code: { type: "number" },
            message: { type: "string" },
          },
        },
      },
    },

    handler: async (req, reply) => {
      const { e, p, n } = req.query;
      if (e === "" || p === "" || n === "") {
        reply.code(401).send({
          code: 401,
          message: "Every query must be filled",
        });
      }
      await User.create({
        email: e,
        password: p,
        name: n,
      });

      reply.code(200).send({
        message: "User created successfully, you can now get your key.",
      });
    },
  });
};
