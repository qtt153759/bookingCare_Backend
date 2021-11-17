'use strict';
// duoc khoi tao model san bang cau lenh nay :npx sequelize-cli model:generate --name History --attributes firstName:string,lastName:string,email:string
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  History.init({
    // khong can khai bao id:DataTypes.INTEGER,
    patientId:DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    files: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};