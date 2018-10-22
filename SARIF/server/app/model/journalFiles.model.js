module.exports = (sequelize, Sequelize) => {
    const JournalFiles = sequelize.define('JournalFiles', {
        FileId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        FileData: {
            type: Sequelize.BLOB,
            allowNull: true,
        },
        JournalID: {
            type: Sequelize.INTEGER,
            allowNull: true
        }

    });

    return JournalFiles;
}