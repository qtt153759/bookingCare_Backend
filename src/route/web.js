//file web nay la router
import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD); //
    router.get("/delete-crud", homeController.deleteCRUD); //xoa user

    router.post("/api/login", userController.handleLogin); //dang nhap
    router.get("/api/get-all-users", userController.handleGetAllUser); //dang nhap
    router.post("/api/create-new-user", userController.handleCreatNewUser);
    router.put("/api/edit-user", userController.handleEditNewUser);
    router.delete("/api/delete-user", userController.handleDeleteNewUser);

    router.get("/api/allcode", userController.getAllCode);

    router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
    return app.use("/", router);
};
module.exports = initWebRoutes;
