const { catchAsyncErr } = require('../../utils/CatchAsyncErr');
const notificationModel = require('./notification.model');

exports.createDriverLicenseNotification = async (driverLisenceRenewalDate, driverId) => {
  console.log(driverLisenceRenewalDate);
  let date = new Date(driverLisenceRenewalDate);
  console.log(date);
  const message = `your driving lisence renewal date is on ${date}`;
  date.setDate(date.getDate() - 7);
  console.log(date);
  const notification = await notificationModel.create({ date, message, to: driverId });
  return notification._id;
};

exports.createCarLicenseNotification = async (carLicenseRenewalDate, driverId) => {
  let date = new Date(carLicenseRenewalDate);
  const message = `your car lisence renewal date is on ${date}`;
  date.setDate(date.getDate() - 7);
  const notification = await notificationModel.create({ date, message, to: driverId });
  return notification._id;
};

exports.createCarPeriodicDate = async (lastPeriodicMaintenanceDate, averageMiles, milesLimit, driverId) => {
  let date = new Date(lastPeriodicMaintenanceDate);
  const years = Math.trunc(milesLimit / (averageMiles * 12));
  let months = Math.floor(milesLimit % (averageMiles * 12));
  let str = String(months);
  const substring = str.slice(0, 2);
  months = Number(substring);

  date.setFullYear(date.getFullYear() + years);
  date.setMonth(date.getMonth() + months);

  if (date.getMonth() > 11) {
    date.setFullYear(date.getFullYear() + 1);
    date.setMonth(date.getMonth() - 12);
  }

  const formattedDate = date.toISOString().slice(0, 10);
  const message = `Your periodic maintenance date is on ${formattedDate}`;
  date.setDate(date.getDate() - 7);
  const notification = await notificationModel.create({ date, message, to: driverId });

  return notification._id;
};

exports.updateDriverLicenseNotification = async (driverLisenceRenewalDate, noficationId) => {
  const date = new Date(driverLisenceRenewalDate);
  const message = `your driving lisence renewal date is on ${date}`;
  date.setDate(date.getDate() - 7);
  const notification = await notificationModel.findOneAndUpdate({ _id: noficationId }, { date, message });
  console.log(notification._id)
  return notification._id;
};

exports.updateCarLicenseNotification = async (carLicenseRenewalDate, noficationId) => {
  const date = new Date(carLicenseRenewalDate);
  const message = `your car lisence renewal date is on ${date}`;
  date.setDate(date.getDate() - 7);
  const notification = await notificationModel.findOneAndUpdate({ _id: noficationId }, { date, message });
  return notification._id;
};

exports.updateCarPeriodicDate = async (lastPeriodicMaintenanceDate, averageMiles, milesLimit, noficationId) => {
  const date = new Date(lastPeriodicMaintenanceDate);
  const years = Math.trunc(milesLimit / (averageMiles * 12));
  let months = Math.floor(milesLimit % (averageMiles * 12));
  let str = String(months);
  const substring = str.slice(0, 2);
  months = Number(substring);

  date.setFullYear(date.getFullYear() + years);
  date.setMonth(date.getMonth() + months);

  if (date.getMonth() > 11) {
    date.setFullYear(date.getFullYear() + 1);
    date.setMonth(date.getMonth() - 12);
  }
  date.setMonth(date.getMonth() - 1);
  const formattedDate = date.toISOString().slice(0, 10);
  const message = `Your periodic maintenance date is on ${formattedDate}`;
  date.setDate(date.getDate() - 7);
  const notification = await notificationModel.findOneAndUpdate({ _id: noficationId }, { date, message });

  return notification._id;
};


exports.getNotifications = catchAsyncErr(async (req, res, next) => {
  let newNotifications = false;
  const notifications = await notificationModel.find({ to: req.user._id, date: { $lt: new Date() } });

  for (const notification of notifications) {
    if (notification.seen === false) {
      notification.seen = true;
      notification.save();
      newNotifications = true;
    }
  }
  res.status(200).json({ newNotifications, data: notifications });
});


exports.createNotification = async (date,message,to) => {
  const notification = await notificationModel.create({ to,date,message });
};