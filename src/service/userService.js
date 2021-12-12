import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: [
                        "email",
                        "roleId",
                        "password",
                        "firstName",
                        "lastName",
                    ], //select
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compareSync(
                        password,
                        user.password
                    ); //ham compare code ma hoa
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "Ok";
                        delete user.password; //sau khi attributes ma muon an thuoc tinh nao thi delete
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User not found";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your email isn't exsit";
            }
            resolve(userData);
        } catch (er) {
            reject(er);
        }
    });
};

let checkUserEmail = async (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    });
};
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "All") {
                users = await db.User.findAll({
                    attributes: { exclude: ["password"] },
                });
            }
            if (userId && userId !== "All") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: { exclude: ["password"] },
                });
            }
            resolve(users);
        } catch (ex) {
            reject(ex);
        }
    });
};

let creatNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Your email is already in used,please try another email",
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(
                    data.password
                );
                await db.User.create({
                    //co 2 cach de tao 1 doi tuong, c1: tao new roi save, c2 : dung truc tiep ham create
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    phoneNumber: data.phoneNumber,
                    roleId: data.roleId,
                    positionId: data.positionId,
                });
                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters",
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
            } else {
                resolve({
                    errCode: 0,
                    message: "Update the user succeeds!",
                });
            }
            resolve({
                errCode: 0,
                message: "Update the user succeeds!",
            });
        } catch (e) {
            reject(e);
        }
    });
};
let deleteUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundUser = await db.User.findOne({
                where: { id: data.id },
            });
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: "The user isn't exsit",
                });
            }
            //await foundUser.destroy() cau lenh nay se gap loi destroy() is not a function vi foundUser la object ko phai instance
            //=> dung luon db.User.destroy() xuong han db lam luon cho nhanh
            await db.User.destroy({
                where: { id: data.id },
            });
            resolve({
                errCode: 0,
                errMessage: "The user is deleted",
            });
        } catch (err) {
            reject(err);
        }
    });
};
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (ex) {
            reject(ex);
        }
    });
};
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters",
                });
            } else {
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput },
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    //luu y jo duong exports={handleUserLogin:handleUserLogin}  vi se co lôi handleUserLogin is not function=>luc nao cung dung module.export
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    creatNewUser: creatNewUser,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService,
};
