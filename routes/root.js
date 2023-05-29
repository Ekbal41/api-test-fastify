"use strict";
const User = require("../models/user.js");
module.exports = async function (fastify, opts) {
  fastify.get("/",  async (req, reply) => {
    const users = await User.find({});
   return reply.view("/index.ejs", { users });
  });
};
