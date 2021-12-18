import { reject } from "bcrypt/promises";
import db from "../models/index";
import _, { result } from "lodash";

require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                order: [["createdAt", "DESC"]],
                where: { roleId: "R2" },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueEn", "valueVi"],
                    },
                    {
                        model: db.Allcode,
                        as: "genderData", //giống cái as khi định nghĩa associate
                        attributes: ["valueEn", "valueVi"],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" },
                attributes: {
                    exclude: ["password", "image"],
                },
            });
            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !inputData.doctorId ||
                !inputData.contentHTML ||
                !inputData.contentMarkdown ||
                !inputData.action
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                if (inputData.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.descriptiony,
                        doctorId: inputData.doctorId,
                    });
                } else if (inputData.action === "EDIT") {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false, // cái này phải là raw bằng false thì mới đúng kiểu sequelize object thì ở dưới ms save đc
                    });
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown =
                            inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        await doctorMarkdown.save();
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save infor doctor succeed!",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailDoctorById = async (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: [
                                "description",
                                "contentHTML",
                                "contentMarkdown",
                            ],
                        },
                        {
                            model: db.Allcode,
                            as: "positionData",
                            attributes: ["valueEn", "valueVi"],
                        },
                    ], //tương đương câu lệnh join(EG loading)
                    raw: false, //với frontEnd thì raw thế nào cx được trừ postman,
                    //ở đây cần raw bằng false để chuyển đổi file ảnh ở dưới(raw=true=>sequelize object,=false=>javascript object)
                    nest: true, //đóng gói object lại cho nó gọn gàng
                });
                //convert ảnh blob buffer sang base64 từ server
                if (data && data.image) {
                    data.image = new Buffer(data.image, "base64").toString(
                        "binary"
                    );
                } else {
                    data = {};
                }
                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    //append maxNumber
                    schedule = schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });
                }
                //get all existing data in schedule that (have doctorId and date we want)
                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.formatedDate,
                    },
                    attributes: ["timeType", "date", "doctorId", "maxNumber"],
                    raw: true, //muốn so sánh thì findAll này phải kiểu raw
                });

                //convert Date
                if (existing && existing.length > 0) {
                    existing = existing.map((item) => {
                        item.date = new Date(item.date).getTime();
                        return item;
                    });
                }
                //compare different
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                });
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: "Ok ",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule,
};
