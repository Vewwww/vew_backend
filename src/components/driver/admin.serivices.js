const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const mechanicWorkshopModel = require("../MechanicWorkshop/mechanicWorkshop.model");
const winchModel = require("../winch/winch.model");
const driverModel = require("./driver.model");

exports.addAdmin=catchAsyncErr(async(req,res)=>{
    let cars = [];
    if (req.body.cars) {
      cars = req.body.cars;
      delete req.body.cars;
    }
  
    let user = new driverModel(req.body);
    await user.save();
  
    let carsResult = [];
    if (cars.length) {
      for (car of cars) {
        car.owner = user._id;
        const createdCar = new carModel(car);
        createdCar.save();
        carsResult.push(createdCar);
      }
    }

    res.status(200).json({message:"Verify your email"});
  });
exports.userStatistics=catchAsyncErr(async(req,res)=>{
    console.log(mechanicWorkshopModel.count());
    // console.log(winchModel.count());
    // console.log(driverModel.find({role:"driver"}).count());
    res.json({message:"hiii"})
}
)