"use strict";
//khoi tao migrate bang cau lenh nay: npx sequelize-cli db:migrate
//sau do co theo tao du lieu fake = seeder: npx sequelize-cli seed:generate --name demo-user
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Schedules", {
            //     currentNumber:DataTypes.INTEGER,
            // maxNumber:DataTypes.INTEGER,
            // date: DataTypes.DATE,
            // timeType: DataTypes.STRING,
            // doctorId:DataTypes.INTEGER
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            currentNumber: {
                type: Sequelize.INTEGER,
            },
            maxNumber: {
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.STRING,
            },
            timeType: {
                type: Sequelize.STRING,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Schedules");
    },
};
