import doctorService from "../service/doctorService";
let getTopDoctorHome = async (req, res) => {
    try {
        let limit = req.query.limit || 10;
        let response = await doctorService.getTopDoctorHome(+limit); //convert ra số nguyên,tránh truyền 1 string

        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "error from server...",
        });
    }
};

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
};
