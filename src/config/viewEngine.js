import express from "express"

let configViewEngine=(app)=>{
    app.use(express.static("./src/public"));//mac dinh file public
    app.set("view engine","ejs");//set view engine dung ejs
    app.set("views","./src/views")//set moi khi tim file ejs thi vao file ./src/view
}
module.exports=configViewEngine