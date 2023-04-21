const asyncHandler = require("express-async-handler");
const service = require("./service.model");
const AppErr = require("../../utils/AppErr");

//create new service

exports.createService = asyncHandler(async (req, res) => {
   const name = req.body;
 
    const createdService= await service.create(name);
  
    res.status(200).json({
      status: "success",
      data: createdService,
    });
  });


//get all service

  exports.getServices = asyncHandler(async (req, res) => {
    const services = await service.find();
  
    res.status(200).json({
      status: "success",
      results: services.length,
      data: services,
    });
  });  



//get specific service with id

  exports.getService = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    const _service = await service.findById(id);
    if (!_service) {
      return next(new AppErr("No service found for this id", 404));
    }
  
    res.status(200).json({
      status: "success",
      data: _service,
    });
  });

// update specific service with id
  exports.updateService = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const _service  = req.body;
    const updatedService = await service.findOneAndUpdate({ _id: id }, _service, {
      new: true,
    });
  
    if (!updatedService) {
      return next(new AppErr("No service found for this id", 404));
    }
  
    res.status(201).json({
      status: "success",
      data: updatedService,
    });
  });

// delete specific service with id

  exports.deleteService = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedService = await service.findOneAndDelete({ _id: id });
  
    if (!deletedService) {
      return next(new AppErr("No service found for this id", 404));
    }
  
    res.status(204).send();
  });