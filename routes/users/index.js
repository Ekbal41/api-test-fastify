'use strict'

const { verifyUserAndPassword, verifyJWTandLevel } = require("../../utils")

module.exports = async function (fastify, opts) {
  fastify
    .decorate('verifyUserAndPassword', verifyUserAndPassword)
    .decorate('verifyJWTandLevel', verifyJWTandLevel)

    .register(require('@fastify/auth'))
    .after(() => {
      fastify.route({
        method: 'GET',
        url: '/',
        preValidation: fastify.auth([fastify.verifyJWTandLevel, fastify.verifyUserAndPassword], {
          relation: 'and'
        }),

        handler: (req, reply) => {
          req.log.info('Auth route')
          reply.send({ hello: 'world' })
        }
      })
    })

}
