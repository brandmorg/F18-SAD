module.exports = (sequelize, Sequelize) => {
    const ChartAccount = sequelize.define('ChartOfAccounts', {
        caId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        accountType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        accountSubType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        reportType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        accountNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        normalSide: {
          type: Sequelize.STRING,
          allowNull: false
        },
        originalBalance: {
          type: Sequelize.DECIMAL,
          allowNull: false
        },
        currentBalance: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        active: {
          type: Sequelize.STRING,
            allowNull: false
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: true
        },
        accountName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return ChartAccount;
}