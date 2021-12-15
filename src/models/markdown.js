"use strict";
// duoc khoi tao model san bang cau lenh nay :npx sequelize-cli model:generate --name Markdown --attributes firstName:string,lastName:string,email:string
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Markdown.belongsTo(models.User, { foreignKey: "doctorId" });
        }
    }
    Markdown.init(
        {
            // khong can khai bao id:DataTypes.INTEGER,
            contentHTML: DataTypes.TEXT("long"),
            contentMarkdown: DataTypes.TEXT("long"),
            description: DataTypes.TEXT("long"),
            doctorId: DataTypes.INTEGER,
            specialtyId: DataTypes.INTEGER,
            clinicId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Markdown",
        }
    );
    return Markdown;
};
