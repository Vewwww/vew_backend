const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const notificationModel = require("./notification.model")
exports.createNotification = catchAsyncErr(async (averageMiles, driverLisenceRenewalDate, carLicenseRenewalDate, lastPeriodicMaintenanceDate, driverId) => {
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
        const date = lastPeriodicMaintenanceDate
        if (miles + averageMilesPerMonth > 9000) {
            const maintenanceDate = new Date();
            const maintenanceDayOfMonth = maintenanceDate.getDate();
            const maintenanceMonth = maintenanceDate.getMonth();
            const maintenanceYear = maintenanceDate.getFullYear();
            const maintenaceDateString = maintenanceDayOfMonth + "-" + (maintenanceMonth + 1) + "-" + maintenanceYear;
            const message = `your periodic maintenance date is on ${maintenaceDateString}`
            notification = await notificationModel.insert(date, message)
            res.status(200).json(message)
        }
    }
})