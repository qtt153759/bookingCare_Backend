"use strict";
// duoc khoi tao model san bang cau lenh nay :npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Allcode.hasMany(models.User, {
                foreignKey: "positionId",
                as: "positionData",
            });
            Allcode.hasMany(models.User, {
                foreignKey: "gender",
                as: "genderData",
            });
            Allcode.hasMany(models.Schedule, {
                foreignKey: "timeType",
                as: "timeTypeData",
            });

            Allcode.hasMany(models.Doctor_Infor, {
                foreignKey: "priceId",
                as: "priceTypeData",
            });
            Allcode.hasMany(models.Doctor_Infor, {
                foreignKey: "provinceId",
                as: "provinceTypeData",
            });
            Allcode.hasMany(models.Doctor_Infor, {
                foreignKey: "paymentId",
                as: "paymentTypeData",
            });
        }
    }
    Allcode.init(
        {
            // khong can khai bao id:DataTypes.INTEGER,
            keyMap: DataTypes.STRING,
            type: DataTypes.STRING,
            valueEn: DataTypes.STRING,
            valueVi: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Allcode",
        }
    );
    return Allcode;
};
