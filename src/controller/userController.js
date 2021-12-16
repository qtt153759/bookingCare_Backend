import userService from "../service/userService";
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        });
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};
let handleGetAllUser = async (req, res) => {
    let id = req.query.id; //all hoa id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required paramater",
            users: [],
        });
    }
    let user = await userService.getAllUser(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "Ok",
        users: user,
    });
};

let handleCreatNewUser = async (req, res) => {
    let message = await userService.creatNewUser(req.body);
    return res.status(200).json(message);
};

let handleEditNewUser = async (req, res) => {
    let message = await userService.updateUserData(req.body);
    return res.status(200).json(message);
};

let handleDeleteNewUser = async (req, res) => {
    if (!req.body) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
        });
    }
    let message = await userService.deleteUser(req.body);
    return res.status(200).json(message);
};
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreatNewUser: handleCreatNewUser,
    handleEditNewUser: handleEditNewUser,
    handleDeleteNewUser: handleDeleteNewUser,
    getAllCode: getAllCode,
};
