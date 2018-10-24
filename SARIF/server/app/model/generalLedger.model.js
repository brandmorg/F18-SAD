module.exports = (sequelize, Sequelize) => {
    const GeneralLedger = sequelize.define('GeneralLedger', {
            glId: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            AccountNumber: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            Date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            Type:{
                type: Sequelize.STRING,
                allowNull: true,
            },
            AccountName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Reference:{
                type: Sequelize.STRING,
                allowNull: true,
            },
            Description:{
                type: Sequelize.STRING,
                allowNull: true,
            },
            NormalSide: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            DebitAmount: {
                type: Sequelize.DECIMAL,
                allowNull: true,
            },
            CreditAmount: {
                type: Sequelize.DECIMAL,
                allowNull: true,
            },

        }
    );


    return GeneralLedger;
}