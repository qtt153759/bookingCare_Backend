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
            Doctor_Infor.belongsTo(models.User, { foreignKey: "doctorId" });

            Doctor_Infor.belongsTo(models.Allcode, {
                foreignKey: "priceId",
                targetKey: "keyMap",
                as: "priceTypeData",
            });
            Doctor_Infor.belongsTo(models.Allcode, {
                foreignKey: "provinceId",
                targetKey: "keyMap",
                as: "provinceTypeData",
            });
            Doctor_Infor.belongsTo(models.Allcode, {
                foreignKey: "paymentId",
                targetKey: "keyMap",
                as: "paymentTypeData",
            });
        }
    }
    Doctor_Infor.init(
        {
            // khong can khai bao id:DataTypes.INTEGER,
            doctorId: DataTypes.INTEGER,
            specialtyId: DataTypes.INTEGER,
            clinicId: DataTypes.INTEGER,
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
            freezeTableName: true, //đây là điểm khác biệt vs các model khác vd (model user -> migration users) bảng nào cx vậy migration sẽ tự động thêm s
            //do file migration của doctor_infor là doctor_infors không có s, nên nếu muốn dùng các lệnh truy vấn bình thường như
            //VD: await db.Doctor_Infor.findAll({})=> thêm freezeTableName:true trong model
        }
    );
    return Doctor_Infor;
};
