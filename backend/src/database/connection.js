const knex = require('knex');
const config = require('../../knexfile');

const configEnv = process.env.NODE_ENV === 'test' ? config.test : config.development;
const connection = knex(configEnv);

module.exports = connection;