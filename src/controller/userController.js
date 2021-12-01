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
  console.log(userData);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUser = async (req, res) => {
  let id = req.query.id; //all hoa id
  console.log("abe");
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

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
};
