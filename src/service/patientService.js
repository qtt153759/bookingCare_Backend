import db from "../models/index";

require("dotenv").config();
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
<<<<<<< HEAD
            console.log(data);
=======
>>>>>>> 52b98242a3c05952ffa6436eda58dbf33b4b994d
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
<<<<<<< HEAD
                    defaults: {
                        //defaults có s
=======
                    default: {
>>>>>>> 52b98242a3c05952ffa6436eda58dbf33b4b994d
                        email: data.email,
                        roleId: "R3",
                    },
                });
<<<<<<< HEAD
                console.log(user);
=======
>>>>>>> 52b98242a3c05952ffa6436eda58dbf33b4b994d
                if (user && user[0]) {
                    //hàm findOrCreate sẽ trả ra 1 mảng trong đó user[0] là data, user[1] là true/false tùy vào update hay create
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
<<<<<<< HEAD
                        defaults: {
=======
                        default: {
>>>>>>> 52b98242a3c05952ffa6436eda58dbf33b4b994d
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
