module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("Users", "image", {
                type: Sequelize.BLOB("long"),
                //Note that: A BLOB can be 65535 bytes maximum (0.065535 MB) If you need more consider using a MEDIUMBLOB for 16777215 bytes (16.777215 MB)
                //or a LONGBLOB for 4294967295 bytes (~ 4GB)
                allowNull: true,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("Users", "image", {
                type: Sequelize.STRING,
                allowNull: true,
            }),
        ]);
    },
};
