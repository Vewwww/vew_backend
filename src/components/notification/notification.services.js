const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const notificationModel=require("./notification.model")
exports.createNotification=catchAsyncErr(async(req,res)=>{
    const {driverLisenceRenewalDate,carLicenseRenewalDate,lastPeriodicMaintenanceDate}=req.body
    if(driverLisenceRenewalDate){
       const date=driverLisenceRenewalDate
       const message=`your driving lisence renewal date is on ${date}`
       notification=await notificationModel.insert(date,message)
    }
    if(carLicenseRenewalDate){
        const date=carLicenseRenewalDate
       const message=`your car lisence renewal date is on ${date}`
       notification=await notificationModel.insert(date,message)
    }
    if(lastPeriodicMaintenanceDate){
        const date=lastPeriodicMaintenanceDate
        const message=`your periodic maintenance date is on ${date}`
        notification=await notificationModel.insert(date,message)
    }
    
})