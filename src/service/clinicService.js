const db = require("../models");

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown ||
                !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    address: data.address,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });
                resolve({
                    errCode: 0,
                    errMessage: "create specialty succeed",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = Buffer.from(item.image, "base64").toString(
                        "binary"
                    );
                    return item;
                });
            }
            resolve({
                errCode: 0,
                errMessage: "create specialty succeed",
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({ errCode: 1, errMessage: "Missing parameter" });
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: [
                        "address",
                        "name",
                        "descriptionHTML",
                        "descriptionMarkdown",
                    ],
                });
                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: {
                            clinicId: inputId,
                        },
                        attributes: ["doctorId", "provinceId"],
                    });

                    data.doctorClinic = doctorClinic;
                } else {
                    data = {};
                }
                resolve({
                    errCode: 0,
                    errMessage: "Ok",
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createClinic,
    getAllClinic,
    getDetailClinicById,
};
