module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define('log', {
        logId: {
        type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        actionType: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Log;
}