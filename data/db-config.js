const knex = require('knex')
const configs = require('../knexfile')

/** @type {import('knex').Knex} */
module.exports = knex(configs[process.env.NODE_ENV])
