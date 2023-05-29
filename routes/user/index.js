"use strict";

const { verifyUserAndPassword, verifyJWTandLevel } = require("../../utils");

module.exports = async function (fastify, opts) {
  fastify
    .decorate("verifyUserAndPassword", verifyUserAndPassword)
    .decorate("verifyJWTandLevel", verifyJWTandLevel)
    .register(require("@fastify/auth"))
    .after(() => {
      fastify.route({
        method: "GET",
        url: "/get-key",
        preValidation: fastify.auth([
          fastify.verifyJWTandLevel,
          fastify.verifyUserAndPassword,
        ], {
          relation: "and",
        }),

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
          //get url params
          const { email, password } = req.query;
          if (email === "" || password === "") {
            reply.code(401).send({
              code: 401,
              message: "You must provide email and password",
            });
          }
          const key = fastify.jwt.sign({ email });
          reply.code(200).send({
            key: key,
          });
        },
      });
      fastify.route({
        method: "POST",
        url: "/register",
        preValidation: fastify.auth([
          fastify.verifyJWTandLevel,
          fastify.verifyUserAndPassword,
        ], {
          relation: "and",
        }),

        schema: {
          summery: "Create user",
          description: "Create user",
          tags: ["User"],
          body: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              password: { type: "string" },
            },
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
          const { email, password, name } = req.body;
          if (email === "" || password === "" || name === "") {
            reply.code(401).send({
              code: 401,
              message: "Every field must be filled",
            });
          }
          reply.code(200).send({
            message: "User created successfully, you can now get your key.",
          });
        },
      });
    });
};
