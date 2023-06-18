const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const mechanicWorkshopModel = require("../MechanicWorkshop/mechanicWorkshop.model");
const winchModel = require("../winch/winch.model");
const driverModel = require("./driver.model");
const factory=require("../Handlers/handler.factory")

exports.addAdmin=factory.createOne(driverModel)
exports.userStatistics=catchAsyncErr(async(req,res)=>{
  const numOfMechanists=await mechanicWorkshopModel.find({}).count()
  const numOfWinches=await winchModel.find({}).count()
  const numOfDrivers=await driverModel.find({role:"user"}).count()
  const numOfAllUsers=numOfDrivers+numOfMechanists+numOfWinches
  const pecerntageDrivers=(numOfDrivers/numOfAllUsers)*100
  const pecerntageMechanists=(numOfMechanists/numOfAllUsers)*100
  const pecerntageWinches=(numOfWinches/numOfAllUsers)*100
  res.status(200).json({numOfAllUsers:numOfAllUsers,numOfMechanists:pecerntageMechanists,numOfWinches:pecerntageWinches,numOfDrivers:pecerntageDrivers})
  }
)
// exports.highestTenModelIssues=catchAsyncErr(async(req,res)=>{
  
// })