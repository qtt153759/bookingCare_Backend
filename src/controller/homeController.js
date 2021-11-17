import db from "../models/index";// chi can load db thoi vi trong db co ham foreach se load tat ca cac thu trong db
import CRUDservice from "../service/CRUDservice";//service la sai vat cho controller


let getHomePage=async (req,res)=>{
    try{
        let data=await db.User.findAll();// db foreach tim USER( trong file user export ra USER)
        console.log("-----------------------")
        console.log(data);
        console.log("-----------------------")
        return res.render("homepage.ejs",{//render khong phai res(dung file trong view)
            data:JSON.stringify(data)// cu phap render ra object
        });
    }
    catch(ex){
        console.log(ex);
    }
}
let getAboutPage=(req,res)=>{
    return res.render("test/about.ejs");
}
let getCRUD=(req,res)=>{
    return res.render("CRUD.ejs");
}
let postCRUD=async(req,res)=>{
    let message= await CRUDservice.creatNewUser(req.body);
    console.log(message);
    return res.send("post fron crud haahaaa")
}
let displayGetCRUD=async(req,res)=>{
    let data= await CRUDservice.getAllUser(req.body);
    console.log("--------------------------------------");
    console.log(data);
    console.log("----------------------------------------");
    return res.render("displayCRUD.ejs",{
        dataTable:data,                //cach tao bien trong ejs
    });
}
module.exports={
    getHomePage:getHomePage,
    getAboutPage:getAboutPage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD
}