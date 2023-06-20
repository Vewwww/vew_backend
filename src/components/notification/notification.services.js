const { date } = require("joi");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const notificationModel = require("./notification.model")
exports.createNotification = catchAsyncErr(async (averageMiles,driverLisenceRenewalDate, carLicenseRenewalDate, lastPeriodicMaintenanceDate, driverId) => {
    if (driverLisenceRenewalDate) {
        const date = driverLisenceRenewalDate
        const message = `your driving lisence renewal date is on ${date}`
        notification = await notificationModel.insert(date, message)
        res.status(200).json(message)
    }
    if (carLicenseRenewalDate) {
        const date = carLicenseRenewalDate
        const message = `your car lisence renewal date is on ${date}`
        notification = await notificationModel.insert(date, message)
        res.status(200).json(message)
    }
    //how to access date years and months and modify them
    if (lastPeriodicMaintenanceDate) {
        const date = lastPeriodicMaintenanceDate
        if (totalMiles > 9000) {
            const years=totalMiles/(averageMiles*12)
            const months=totalMiles%(averageMiles*12)
            date.years+=years
            if(date.months+months>12){
                date.years+=1
                date.months=(date.months+months)-12
            }else{
                date.months+=months
            }
            const message = `your periodic maintenance date is on ${date}`
            notification = await notificationModel.insert(date, message)
            res.status(200).json(message)
        }
    }
})
//less than
exports.getNotifications = catchAsyncErr(async(req,res,next)=>{

    let newNotifications = false;
    const {toDayDate} = req.body;
    const notifications = await notificationModel.findOne({ to:req.user._id, date :{$ls : toDayDate}})

    for (const notification of notifications){
        if(notification.seen===false){
            notification.seen=true;
            notification.save();
            newNotifications = true;
        }
    }
    res.status(200).json({newNotifications,data:notifications})
})