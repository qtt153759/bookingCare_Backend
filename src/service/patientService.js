import db from "../models/index";
import emailService from "./emailService";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";
let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
};
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.email ||
                !data.doctorId ||
                !data.timeType ||
                !data.date ||
                !data.fullName ||
                !data.doctorName ||
                !data.language ||
                !data.address ||
                !data.selectedGender
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        //defaults có s
                        email: data.email,
                        roleId: "R3",
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName,
                    },
                });
                if (user && user[0]) {
                    let token = uuidv4();
                    await emailService.sendSimpleEmail({
                        reciverEmail: data.email,
                        patientName: data.fullName,
                        time: data.timeString,
                        doctorName: data.doctorName,
                        language: data.language,
                        redirectLink: buildUrlEmail(data.doctorId, token),
                    });
                    //hàm findOrCreate sẽ trả ra 1 mảng trong đó user[0] là data, user[1] là true/false tùy vào update hay create
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token,
                        },
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save infor patient succeed",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: "S1",
                    },
                    raw: false, //raw bằng false => object sequelize thì mới dùng được hàm update save ở dưới
                });
                if (appointment) {
                    appointment.statusId = "S2";
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: "Updata the appointment succeed!",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage:
                            "Appointment has been activated or doesn't exist!",
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    postBookAppointment,
    postVerifyBookAppointment,
};
