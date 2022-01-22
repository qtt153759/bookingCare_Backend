const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    "d1tdukvidnllnv",
    "qxddysiinhzgmx",
    "694c459f4816442e8a21c4ccd0736f6a4dae2b0361ab8a229d7969786f3d2e3c",
    {
        host: "ec2-34-194-171-47.compute-1.amazonaws.com",
        dialect: "postgres",
        logging: false,
        port: 5432,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
);

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
module.exports = connectDB;
