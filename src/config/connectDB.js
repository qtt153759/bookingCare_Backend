const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("hoidanit", "qtt153759", "truong157359", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    port: 3308,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
module.exports = connectDB;
