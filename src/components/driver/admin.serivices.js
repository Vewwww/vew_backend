const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const mechanicWorkshopModel = require("../MechanicWorkshop/mechanicWorkshop.model");
const winchModel = require("../winch/winch.model");
const driverModel = require("./driver.model");
const factory=require("../Handlers/handler.factory")

exports.addAdmin=factory.createOne(driverModel)
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
  //me7taga azbot el type wel model
  res.status(200).json(modelsHadIssues)
})