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
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
        evict: env.pool.evict
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.generalLedger = require('../model/generalLedger.model')(sequelize, Sequelize);
db.journalFiles = require('../model/journalFiles.model')(sequelize, Sequelize);
db.journalAccounts = require('../model/journalAccounts.model')(sequelize, Sequelize);
db.journal = require('../model/journal.model')(sequelize, Sequelize);
db.chartAccount = require('../model/chartAccount.model')(sequelize, Sequelize);
db.users = require('../model/users.model.js')(sequelize, Sequelize);
db.log = require('../model/log.model.js')(sequelize, Sequelize);

//relations
db.journalAccounts.belongsTo(db.journal);
db.journal.hasMany(db.journalAccounts);


module.exports = db;