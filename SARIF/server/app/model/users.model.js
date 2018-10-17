module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define('users2s', {
        userId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        userRole: {
            type: Sequelize.STRING,
            allowNull: true
        },
        userPassword: {
            type: Sequelize.STRING,
            allowNull: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        securityQ: {
            type: Sequelize.STRING,
            allowNull: true
        },
        securityA: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastUpdatePassword: {
            type: Sequelize.DATE,
            allowNull: true
        },
        passwordExpire: {
            type: Sequelize.DATE,
            allowNull: true
        },
        //set the starting value of an account to true (1)
        active: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        }
    });

    return users;
}