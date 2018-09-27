'use strict';
const env = require('./env.js');
const path      = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    operatorsAliases: false,

    /*pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }*/
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../model/users.model.js')(sequelize, Sequelize);
db.log = require('../model/log.model.js')(sequelize, Sequelize);

module.exports = db;