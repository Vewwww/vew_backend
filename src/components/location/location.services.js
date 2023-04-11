const asyncHandler = require("express-async-handler");
const LocationModel = require("./location.model");
const AppErr = require("../../utils/AppErr");

//@desc   create location
//@route  POST /api/v1/location
//@access Private
exports.createLocation = asyncHandler(async (req, res) => {
  const { location } = req.body;
  const createdLocation = await LocationModel.create(location);

  res.status(200).json({
    status: "success",
    data: createdLocation,
  });
});
