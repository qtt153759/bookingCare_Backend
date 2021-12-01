import db from '../models/index'
import bcrypt from 'bcryptjs'

let handleUserLogin= (email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let userData={};
            let isExsit=await checkUserEmail(email);
            if(isExsit){
                let user=await db.User.findOne({
                    attributes:['email','roleId','password'],//select
                    where:{email:email},
                    raw:true
                });
                if(user){
                    let check=await bcrypt.compareSync(password,user.password);//ham compare code ma hoa
                    if(check){
                        userData.errCode=0;
                        userData.errMessage="Ok";
                        delete user.password;//sau khi attributes ma muon an thuoc tinh nao thi delete
                        userData.user=user;
                    }else{
                        userData.errCode=3;
                        userData.errMessage="wrong password";
                    }
                }else{
                    userData.errCode=2;
                    userData.errMessage="User not found";
                }
            }else{
                userData.errCode=1;
                userData.errMessage="Your email isn't exsit"
            }
            resolve(userData);
        }catch(er){
            reject(er);
        }
    });
}

let checkUserEmail=async(userEmail)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user=await db.User.findOne({
                where:{email: userEmail}
            })
            if(user){
                resolve(true);
            }else{
                resolve(false);
            }
        }catch(err){
            reject(err);
        }
    })
}
let getAllUser= (userId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let users='';
        if(userId==="All"){
            users=await db.User.findAll({
                attributes:{exclude:["password"]}
            })
        }  
        if(userId&& userId!=="All"){
            users=await db.User.findOne({
                where:{id:userId},
                attributes:{exclude:["password"]}
            })
        }
        resolve(users)
    }catch(ex){
        reject(ex);
    }
    });
}
module.exports={//luu y jo duong exports={handleUserLogin:handleUserLogin}  vi se co lôi handleUserLogin is not function=>luc nao cung dung module.export
    handleUserLogin:handleUserLogin,
    getAllUser:getAllUser
}