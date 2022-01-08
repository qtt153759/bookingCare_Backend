"use strict";
//khoi tao migrate bang cau lenh nay: npx sequelize-cli db:migrate
//sau do co theo tao du lieu fake = seeder: npx sequelize-cli seed:generate --name demo-user
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("clinics", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            descriptionHTML: {
                type: Sequelize.TEXT,
            },
            descriptionMarkdown: {
                type: Sequelize.TEXT,
            },
            image: {
                type: Sequelize.BLOB("long"),
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("clinics");
    },
};
