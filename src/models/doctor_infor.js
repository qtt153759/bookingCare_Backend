"use strict";
const { INTEGER } = require("sequelize");
// duoc khoi tao model san bang cau lenh nay :npx sequelize-cli model:generate --name Doctor_Infor --attributes firstName:string,lastName:string,email:string
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Doctor_Infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Doctor_Infor.init(
        {
            // khong can khai bao id:DataTypes.INTEGER,
            doctorId: DataTypes.INTEGER,
            priceId: DataTypes.STRING,
            provinceId: DataTypes.STRING,
            paymentId: DataTypes.STRING,
            addressClinic: DataTypes.STRING,
            nameClinic: DataTypes.STRING,
            note: DataTypes.STRING,
            count: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Doctor_Infor",
        }
    );
    return Doctor_Infor;
};
