const verifyUserAndPassword = async (request, reply) => {
    request.log.info('verifyUserAndPassword test')

}

const verifyJWTandLevel = async (request, reply) => {
    request.log.info('verifyJWTandLevel test')
}
module.exports = {
    verifyUserAndPassword,
    verifyJWTandLevel

}