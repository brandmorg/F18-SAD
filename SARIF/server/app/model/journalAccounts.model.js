module.exports = (sequelize, Sequelize) => {
    const JournalAccount = sequelize.define('JournalAccount', {
        JAId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        AccountName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        NormalSide: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        DebitAmmount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        },
        CreditAmmount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        },

    }
    );


    return JournalAccount;
}