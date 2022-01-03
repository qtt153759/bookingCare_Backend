"use strict";
// duoc khoi tao model san bang cau lenh nay :npx sequelize-cli model:generate --name Booking --attributes firstName:string,lastName:string,email:string
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Booking.init(
        {
            // khong can khai bao id:DataTypes.INTEGER,
            statusId: DataTypes.STRING,
            doctorId: DataTypes.INTEGER, //doctorId la id cua bang user -> la integer
            patientId: DataTypes.INTEGER,
            date: DataTypes.STRING, //date mà dùng kiểu date thì lúc query lên rất là mệt => dùng String
            timeType: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Booking",
        }
    );
    return Booking;
};
