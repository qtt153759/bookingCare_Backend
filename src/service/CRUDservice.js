//service phuc vu cho controler
import db from "../models/index"
import bcrypt from "bcryptjs"//3 buoc de ma hoa b1:const salt=bcrypt.genSaltSync(10); b2:const salt=bcrypt.genSaltSync(10); b3:            let hashPassword=await bcrypt.hashSync(password,salt);
const salt=bcrypt.genSaltSync(10);
let creatNewUser=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let hashPasswordFromBcrypt=await hashUserPassword(data.password);
            await db.User.create({//cau lenh de creat
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

module.exports={
    creatNewUser:creatNewUser
}