import db from "../models/index";
import emailService from "./emailService";
require("dotenv").config();
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
                !data.language
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
                    },
                });
                if (user && user[0]) {
                    await emailService.sendSimpleEmail({
                        reciverEmail: data.email,
                        patientName: data.fullName,
                        time: data.timeString,
                        doctorName: data.doctorName,
                        language: data.language,
                        redirectLink:
                            "https://www.youtube.com/watch?v=0GL--Adfqhc&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=94",
                    });
                    //hàm findOrCreate sẽ trả ra 1 mảng trong đó user[0] là data, user[1] là true/false tùy vào update hay create
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
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
module.exports = {
    postBookAppointment,
};
