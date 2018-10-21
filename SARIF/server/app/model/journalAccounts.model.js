module.exports = (sequelize, Sequelize) => {
    const JournalAccount = sequelize.define('JournalAccount', {
        JAId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
            Type:{
                type: Sequelize.STRING,
                allowNull: true,
            },
        AccountName: {
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


    return JournalAccount;
}