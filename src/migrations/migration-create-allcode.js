"use strict";
//khoi tao migrate bang cau lenh nay: npx sequelize-cli db:migrate
//sau do co theo tao du lieu fake = seeder: npx sequelize-cli seed:generate --name demo-user
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("allcodes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            keyMap: {
                //tuyệt đối không được đặt là key, vì nó trùng vs sequelize nên sẽ có lỗi
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            valueEn: {
                type: Sequelize.STRING,
            },
            valueVi: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("allcodes");
    },
};
