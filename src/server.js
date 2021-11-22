//file main server
import express  from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"
import cors from "cors";
require('dotenv').config();//dung de dung lenh process.env
let app=express();

//app.use(cors({origin:true}));//tranh loi cors server ten mien// khong co tac dung localhost
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin',process.env.URL_REACT);//cho phep cong 3000 cua ben react

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));//phai body praser truoc khi CRUD

viewEngine(app);// tao mot so confic viewEngin 
initWebRoutes(app);//ROUTE

connectDB();//connect db truoc khi listen port
let port=process.env.PORT||8080;
app.listen(port,()=>{
    console.log(`Back end running in ${port}`);
})
