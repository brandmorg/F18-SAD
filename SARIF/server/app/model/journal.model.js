module.exports = (sequelize, Sequelize) => {
    const Journal = sequelize.define('Journal', {
        JId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Date: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        Description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        Reference: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        CreatedBy:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        FileID: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    });
    return Journal;
}