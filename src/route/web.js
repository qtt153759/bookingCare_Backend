import  express from "express";
import getHomePage from "../controller/homeController"
let router=express.Router();
let initWebRoutes=(app)=>{
    router.get('/',getHomePage.getHomePage);
    router.get('/about',getHomePage.getAboutPage)
    return app.use("/",router);
}
module.exports=initWebRoutes;