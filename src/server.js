//file main server
import express  from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"
require('dotenv').config();//dung de dung lenh process.env
let app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));//phai body praser truoc khi CRUD

viewEngine(app);// tao mot so confic viewEngin 
initWebRoutes(app);//ROUTE

connectDB();//connect db truoc khi listen port
let port=process.env.PORT||8080;
app.listen(port,()=>{
    console.log(`Back end running in ${port}`);
})
