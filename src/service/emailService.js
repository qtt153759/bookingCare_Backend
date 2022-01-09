require("dotenv").config();
//Thư viện gửi mail
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Quách Thế Trường 👻" <qtt153759@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        // text: "Hello world?", // plain text body Viết html thì đc nhiều thứ hơn
        html: getBodyHTMLEmail(dataSend),
    });
};
let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `<h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care<p>
        <p>Thông tin đặt lịch khám bệnh:<p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới 
        để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
        </p>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
        <div>Xin chân thành cảm ơn</div>
        
        `;
    }
    if (dataSend.language === "en") {
        result = `<h3>Hello ${dataSend.patientName}</h3>
        <p>You received this email because you booked an online medical appointment on Booking Care<p>
        <p>Information to book a medical appointment:<p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the above information is true, please click on the link below
        to confirm and complete the procedure to book a medical appointment.
        </p>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
        <div>Sincerely thank</div>
        
        `;
    }
    return result;
};
let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `<h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care thành công<p>
        <p>Thông tin đơn thuốc và hóa đơn được gửi trong file đính kèm:<p>
        <div>Xin chân thành cảm ơn</div>
        
        `;
    }
    if (dataSend.language === "en") {
        result = `<h3>Hello ${dataSend.patientName}</h3>
        <p>You received this email because your appointment on bookingCare is confirmed<p>
        <div>Thank you</div>
        `;
    }
    return result;
};
let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Quách Thế Trường 👻" <qtt153759@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "kết quả khám bệnh", // Subject line
                // text: "Hello world?", // plain text body Viết html thì đc nhiều thứ hơn
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${
                            dataSend.patientName
                        }-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: "base64",
                    },
                ],
            });
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment,
};
