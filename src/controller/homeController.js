import db from "../models/index"; // chi can load db thoi vi trong db co ham foreach se load tat ca cac thu trong db
import CRUDservice from "../service/CRUDservice"; //service la sai vat cho controller

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); // db foreach tim USER( trong file user export ra USER)

        return res.render("homepage.ejs", {
            //render khong phai res(dung file trong view)
            data: JSON.stringify(data), // cu phap render ra object
        });
    } catch (ex) {
        console.log(ex);
    }
};
let getAboutPage = (req, res) => {
    return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
    return res.render("CRUD.ejs");
};
let postCRUD = async (req, res) => {
    let message = await CRUDservice.creatNewUser(req.body);
    console.log(message);
    return res.send("post fron crud haahaaa");
};
let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser(req.body);
    return res.render("displayCRUD.ejs", {
        dataTable: data, //cach tao bien trong ejs
    });
};
let getEditCRUD = async (req, res) => {
    let userId = req.query.id; //dung query de trich xuat id
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        return res.render("editCRUD.ejs", {
            user: userData,
        });
    } else {
        return res.send("id invalid");
    }
};
let putCRUD = async (req, res) => {
    let data = req.body; //dung body de lay toan bo data

    let userData = await CRUDservice.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: userData,
    });
};
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let userData = await CRUDservice.deleteUserById(id);
        return res.send(`delete ${id} succeed`);
    } else {
        return res.send("id not found to delete");
    }
};
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
