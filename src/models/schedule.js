"use strict";
// duoc khoi tao model san bang cau lenh nay :npx sequelize-cli model:generate --name Schedule --attributes firstName:string,lastName:string,email:string
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Schedule.belongsTo(models.Allcode, {
                foreignKey: "timeType",
                targetKey: "keyMap", //Schedult.timeType=AllCode.keyMap
                as: "timeTypeData",
            });
        }
    }
    Schedule.init(
        {
            // khong can khai bao id:DataTypes.INTEGER,
            currentNumber: DataTypes.INTEGER,
            maxNumber: DataTypes.INTEGER,
            date: DataTypes.STRING, //Để string này thì nó lưu timeStamp dưới dạng string
            timeType: DataTypes.STRING,
            doctorId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Schedule",
        }
    );
    return Schedule;
};
