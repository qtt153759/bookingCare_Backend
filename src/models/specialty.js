'use strict';
// duoc khoi tao model san bang cau lenh nay :npx sequelize-cli model:generate --name Specialty --attributes firstName:string,lastName:string,email:string
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Specialty.init({
    // khong can khai bao id:DataTypes.INTEGER,
    description:DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Specialty',
  });
  return Specialty;
};