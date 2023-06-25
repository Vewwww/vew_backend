const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const mechanicWorkshopModel = require("../MechanicWorkshop/mechanicWorkshop.model");
const winchModel = require("../winch/winch.model");
const driverModel = require("./driver.model");
const factory=require("../Handlers/handler.factory")
const carModel = require("../carModel/carModel.model");
const requestModel=require("../request/request.model")
//add admin
exports.addAdmin=factory.createOne(driverModel)
// to get all Users
exports.getUsers = catchAsyncErr(async (req, res) => {
  let Users = await driverModel.find({});
  res.status(200).json(Users);
});
// to get specific User
exports.getUser = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  let User = await driverModel.findById(id);
  !User && next(new AppError("User not found", 400));
  User && res.status(200).json(User);
});
//user statistics
exports.userStatistics=catchAsyncErr(async(req,res)=>{
  const numOfMechanists=await mechanicWorkshopModel.find({}).count()
  const numOfWinches=await winchModel.find({}).count()
  const numOfDrivers=await driverModel.find({role:"user",emailConfirm:"true"}).count()
  const numOfAllUsers=numOfDrivers+numOfMechanists+numOfWinches
  const pecerntageDrivers=(numOfDrivers/numOfAllUsers)*100
  const pecerntageMechanists=(numOfMechanists/numOfAllUsers)*100
  const pecerntageWinches=(numOfWinches/numOfAllUsers)*100
  res.status(200).json({numOfAllUsers:numOfAllUsers,numOfMechanists:pecerntageMechanists,numOfWinches:pecerntageWinches,numOfDrivers:pecerntageDrivers})
  }
)
//top ten car models have issues
exports.tenModelsHadIssues=catchAsyncErr(async(req,res)=>{
  const requests=await requestModel.find()
  modelsHadIssues=[]
  for(const request in requests) {
    carModel=request.car.carType.carModel
    if(!(modelsHadIssues.contains(carModel))){
     carModel=0
     modelsHadIssues.add(carModel)
    }
    carModel++
  }
  modelsHadIssues.sort();
  //get top 10
  for(const model in modelsHadIssues){
    const hadIssues=await carModel.find().populate({path:"carType"})
    res.status(200).json(hadIssues)
  }})
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