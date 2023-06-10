const asyncHandler = require("express-async-handler");
const request = require("./request.model");
const AppErr = require("../../utils/AppError");

//create new request

 
exports.createRequest = asyncHandler(async (req, res) => {
   const _request= req.body;
    const createdRequest= await request.create(_request);
  
    res.status(200).json({
      status: "success",
      data: createdRequest,
    });
  });


//get all requests

  exports.getRequests = asyncHandler(async (req, res) => {
    const requests = await request.find();
  
    res.status(200).json({
      status: "success",
      results: requests.length,
      data: requests,
    });
  });  



//get specific request with id

  exports.getRequest = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    const _request = await request.findById(id);
    if (!_request) {
      return next(new AppErr("No request found for this id", 404));
    }
  
    res.status(200).json({
      status: "success",
      data: _request,
    });
  });

// update specific request with id
  exports.updateRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const  _request  = req.body;
    const updatedRequest = await request.findOneAndUpdate({ _id: id }, _request, {
      new: true,
    });
  
    if (!updatedRequest) {
      return next(new AppErr("No request found for this id", 404));
    }
  
    res.status(201).json({
      status: "success",
      data: updatedRequest,
    });
  });

// delete specific request with id

  exports.deleteRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedRequest = await request.findOneAndDelete({ _id: id });
  
    if (!deletedRequest) {
      return next(new AppErr("No request found for this id", 404));
    }
  
    res.status(204).send();
  });