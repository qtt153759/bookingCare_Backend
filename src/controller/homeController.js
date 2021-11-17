import db from "../models/index";// chi can load db thoi vi trong db co ham foreach se load tat ca cac thu trong db
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
module.exports={
    getHomePage:getHomePage,
    getAboutPage:getAboutPage
}