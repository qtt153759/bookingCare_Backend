//service phuc vu cho controler
import db from "../models/index"
import bcrypt from "bcryptjs"//3 buoc de ma hoa b1:const salt=bcrypt.genSaltSync(10); b2:const salt=bcrypt.genSaltSync(10); b3:            let hashPassword=await bcrypt.hashSync(password,salt);
const salt=bcrypt.genSaltSync(10);
let creatNewUser=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let hashPasswordFromBcrypt=await hashUserPassword(data.password);
            await db.User.create({//co 2 cach de tao 1 doi tuong, c1: tao new roi save, c2 : dung truc tiep ham create
                email:data.email,
                password:hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender="1"?true:false,
                phoneNumber: data.phoneNumber,
                roleId: data.roleId
            })
            resolve("Insert user succeed!");
        }catch(e){
            reject(e);
        }
    });
}
let hashUserPassword=(password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let hashPassword=await bcrypt.hashSync(password,salt);
            resolve(hashPassword);
        }catch(ex){
            reject(ex);
        }
    })
}
let getAllUser=()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let users=await db.User.findAll({//lenh lay tat ca user
                raw:true//raw cho do lay thong tin linh tinh
            });
            resolve(users)
        }catch(e){
            reject(e);
        }
    })
}
module.exports={
    creatNewUser:creatNewUser,
    getAllUser:getAllUser,
}