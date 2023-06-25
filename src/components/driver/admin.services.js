const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const mechanicWorkshopModel = require("../MechanicWorkshop/mechanicWorkshop.model");
const winchModel = require("../winch/winch.model");
const driverModel = require("./driver.model");
const factory=require("../Handlers/handler.factory")
const carModel = require("../carModel/carModel.model");
const requestModel=require("../request/request.model")
const AppError = require("../../utils/AppError");
//add admin
exports.addAdmin=factory.createOne(driverModel)
// to get all Users
exports.getUsers = catchAsyncErr(async (req, res) => {
  let Users = await driverModel.find({});
  let mechanics=await mechanicWorkshopModel.find({})
  let winches=await winchModel.find({})
  res.status(200).json({drivers:Users,mechanics:mechanics,winches:winches});
});
// to get specific User
exports.getUser = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  let User = await driverModel.findById(id);
  if(!User){
    let User=await mechanicWorkshopModel.findById(id)
    User && res.status(200).json(User);
  }
  if(!User){
    let User=await winchModel.findById(id)
    User && res.status(200).json(User);
  }
  !User && next(new AppError("User not found", 400));
  User && res.status(200).json(User);
});
//user statistics
exports.userStatistics=catchAsyncErr(async(req,res)=>{
  const numOfMechanists=await mechanicWorkshopModel.countDocuments()
  const numOfWinches=await winchModel.countDocuments()
  const numOfDrivers=await driverModel.find({role:"user",emailConfirm:"true"}).count()
  const numOfAllUsers=numOfDrivers+numOfMechanists+numOfWinches
  const pecerntageDrivers=(numOfDrivers/numOfAllUsers)*100
  const pecerntageMechanists=(numOfMechanists/numOfAllUsers)*100
  const pecerntageWinches=(numOfWinches/numOfAllUsers)*100
  res.status(200).json({numOfAllUsers:numOfAllUsers,numOfMechanists:pecerntageMechanists,numOfWinches:pecerntageWinches,numOfDrivers:pecerntageDrivers})
  }
)
//top ten car models have issues
exports.tenModelsHadIssues = catchAsyncErr(async (req, res) => {
  const requests = await requestModel.find();
  const modelsHadIssues = {};

  for (const request of requests) {
    const carModel = request.car.carType.carModel;

    if (!modelsHadIssues.hasOwnProperty(carModel)) {
      modelsHadIssues[carModel] = 0;
    }

    modelsHadIssues[carModel]++;
  }

  const top10Models = Object.keys(modelsHadIssues)
    .sort((a, b) => modelsHadIssues[b] - modelsHadIssues[a])
    .slice(0, 10);

  const hadIssues = await carModel.find({ carType: { $in: top10Models } }).populate('carType');
  res.status(200).json(hadIssues);
});

//Gender had problem analytic
  exports.getGenderAnalytic=catchAsyncErr(async(req,res,next)=>{
    const document= await driverModel.find();
    let driverLength=document.length;
    let maleLength=document.filter(driver=>driver.gender=='male').length;
    let femaleLength=document.filter(driver=>driver.gender=='female').length;
    let maleRatio=maleLength/driverLength;
    let femaleRatio=femaleLength/driverLength;
    res.status(200).json({maleRatio,femaleRatio});
  })


exports.getSeasonsAnalytics = catchAsyncErr(async (req, res, next) => {
  const requestsCount = await requestModel.countDocuments();
  const requests = await requestModel.find();

  let seasons = {
    summer: 0,
    winter: 0,
    autumn: 0,
    spring: 0,
  };

  for (const request of requests) {
    const requestMonth = request.created_at.getMonth + 1;
    if (requestMonth in [3, 4, 5]) {
      seasons.spring = seasons.spring + 1;
    } else if (requestMonth in [6, 7, 8]) {
      seasons.summer = seasons.summer + 1;
    } else if (requestMonth in [9, 10, 11]) {
      seasons.autumn = seasons.autumn + 1;
    } else {
      seasons.winter = seasons.winter + 1;
    }
  }

  if(requestsCount >0){
    seasons.spring = (seasons.spring / requestsCount) * 100;
    seasons.summer = (seasons.summer / requestsCount) * 100;
    seasons.autumn = (seasons.autumn / requestsCount) * 100;
    seasons.winter = (seasons.winter / requestsCount) * 100;
  }

  res.status(200).json({ data: seasons });
});