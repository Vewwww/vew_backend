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
    if (lastPeriodicMaintenanceDate) {
        const date = new Date(lastPeriodicMaintenanceDate);
        if (totalMiles > 9000) {
            const years = Math.floor(totalMiles / (averageMiles * 12));
            const months = Math.floor(totalMiles % (averageMiles * 12));
    
            date.setFullYear(date.getFullYear() + years);
            date.setMonth(date.getMonth() + months);
    
            if (date.getMonth() > 11) {
                date.setFullYear(date.getFullYear() + 1);
                date.setMonth(date.getMonth() - 12);
            }
    
            const formattedDate = date.toISOString().slice(0, 10);
            const message = `Your periodic maintenance date is on ${formattedDate}`;
    
           
            notification = await notificationModel.insert(date, message);
    
            res.status(200).json(message);
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
