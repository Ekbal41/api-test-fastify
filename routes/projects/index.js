"use strict";

const User = require("../../models/user");
const Project = require("../../models/project");

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      summery: "Get Projects",
      description: "Get Projects",
      tags: ["Project"],
      querystring: {
        key: { type: "string" },
      },
      response: {
        200: {
          description: "Successful response",
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              title: { type: "string" },
              desc: { type: "string" },
              img: { type: "string" },
              git: { type: "string" },
              url: { type: "string" },
            },
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

    handler: async (req, reply) => {
      const { id, key } = req.query;
      if (key === "" || !key) {
        reply.code(401).send({
          code: 401,
          message: "You must provide your api key",
        });
      }

      const allprojects = await Project.find({});
      const decoded = fastify.jwt.decode(key);
      const isRegisterded = User.findOne({ email: decoded.email });
      if (isRegisterded) {
        reply.code(200).send(allprojects);
      } else {
        reply.code(401).send({
          code: 401,
          message: "You must provide your api key",
        });
      }
    },
  });
  fastify.route({
    method: "GET",
    url: "/single",
    schema: {
      summery: "Get Single Project",
      description: "Get Projects",
      tags: ["Project"],
      querystring: {
        id: { type: "string" },
        key: { type: "string" },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            desc: { type: "string" },
            img: { type: "string" },
            git: { type: "string" },
            url: { type: "string" },
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

    handler: async (req, reply) => {
      const { id, key } = req.query;
      if (key === "" || !key || id === "" || !id) {
        reply.code(401).send({
          code: 401,
          message: "You must provide your api key and project id",
        });
      }

      const allprojects = await Project.find({});
      const decoded = fastify.jwt.decode(key);
      const isRegisterded = User.findOne({ email: decoded.email });
      if (isRegisterded && id) {
        const project = await Project.findById(id);
        reply.code(200).send(project);
      } else {
        reply.code(401).send({
          code: 401,
          message: "You must provide your api key and project id",
        });
      }
    },
  });
};
