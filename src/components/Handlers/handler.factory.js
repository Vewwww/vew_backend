const AppError = require("../../utils/AppError");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const ApiFeatures = require("../../utils/ApiFeatures");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const driverModel = require("../driver/driver.model");
const mechanicWorkshopModel = require("../MechanicWorkshop/mechanicWorkshop.model");
const gasStationModel = require("../GasStation/gasStation.model");
const maintenanceCenterModel = require("../MaintenanceCenter/maintenanceCenter.model");
const { getNearestPlaces } = require("./getNearestPlaces");
const winchModel = require("../winch/winch.model");
const { sendEmail } = require("./email.factory");


exports.createService = (model) => {
    return catchAsyncErr(async (req, res, next) => {
      const obj = req.body;
      const createdService = await model.create(obj);
      console.log(createdService);
      res.status(200).json({
        status: "success",
        data: createdService,
      });
    });
  }

exports.signup = (model) => {
  return catchAsyncErr(async (req, res, next) => {
    email = req.body.email;
    const isUser = await model.findOne({ email });
    if (isUser) return next(new AppError("user already exists", 401));

    let token = jwt.sign({ email }, process.env.EMAIL_JWT_KEY);
    await sendEmail({ email, token, message: "Hello" }, model);
    next();
  });
};

exports.login = catchAsyncErr(async (req, res, next) => {
  let user = await driverModel.findOne({ email: req.body.email });
  let modelName = "driver";

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    user = await mechanicWorkshopModel.findOne({ email: req.body.email });
    modelName = "mechanicworkshops";
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      user = await winchModel.findOne({ email: req.body.email });
      modelName = "winches";
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new AppError("incorrect email or password", 401));
      }
    }
  }

  let token = jwt.sign({ modelName, userId: user._id }, process.env.JWT_KEY);

  if (user.emailConfirm === true) {
    user.logedIn = true;
    user.save();
    res.status(200).json({ token, user });
  } else {
    res.status(401).json({ message: "Please confirm your email" });
  }
});

exports.signin = catchAsyncErr(async (req, res, next) => {
  console.log("entered here");
});

exports.emailVerify = (model) => {
  return catchAsyncErr(async (req, res, next) => {
    const { token } = req.params;
    jwt.verify(token, process.env.EMAIL_JWT_KEY, async (err, decoded) => {
      if (err) {
        return next(new AppError("invalid token", 401));
      } else {
        let user = await model.findOne({ email: decoded.email });
        if (user) {
          await model.findOneAndUpdate(
            { email: decoded.email },
            { emailConfirm: true }
          );

          res.status(200)
            .send(`<h1 style="background:#fff">Email verified successfully!!!</h1>
          <h3>Now you can login</h3>`);
        } else {
          res
            .status(404)
            .send(`<h1 style="background:#fff">user not found</h1>`);
        }
      }
    });
  });
};

exports.authinticate = catchAsyncErr(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError(
        "you are not logedin, please login to get access to this route"
      ),
      401
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_KEY);

  const currentUser = null;
  if (decoded.modelName === "winches") {
    currentUser = await winchModel.findById(decoded.userId);
  } else if (decoded.modelName === "mechanicworkshops") {
    currentUser = await mechanicWorkshopModel.findById(decoded.userId);
  } else {
    currentUser = await driverModel.findById(decoded.userId);
  }

  if (!currentUser) return next(new AppError("this user no longer exist", 401));

  if (currentUser.logedIn === false)
    return next(
      new AppError(
        "you are no longer logedin, please login to get access to this route",
        401
      )
    );

  // if (currentUser.passwordChangedAt) {
  //   const passwordChangedTimeStamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10);
  //   if (passwordChangedTimeStamp > decoded.iat)
  //     return next(new ApiError('user recently changed his password, please login again'), 401);
  // }
  req.user = currentUser;
  next();
});

exports.logout = catchAsyncErr(async (req, res, next) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError(
        "you are not logedin, please login to get access to this route"
      ),
      401
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  let currentUser = null;
  if (decoded.modelName === "winches") {
    currentUser = await winchModel.findById(decoded.userId);
  } else if (decoded.modelName === "mechanicworkshops") {
    currentUser = await mechanicWorkshopModel.findById(decoded.userId);
  } else {
    currentUser = await driverModel.findById(decoded.userId);
  }

  if (!currentUser) return next(new AppError("this user no longer exist", 401));

  if (currentUser.logedIn === true) {
    currentUser.logedIn = false;
    currentUser.save();
  }

  res.status(200).json({ message: "loged out successfuly" });
});

exports.search = catchAsyncErr(async (req, res, next) => {
  const { keyword } = req.query;
  const { latitude, longitude } = req.body;

  const ar_en_name_query = {
    $or: [
      { "name.ar": { $regex: ".*" + keyword + ".*", $options: "i" } },
      { "name.en": { $regex: ".*" + keyword + ".*", $options: "i" } },
    ],
  };

  const name_query = {
    name: { $regex: ".*" + keyword + ".*", $options: "i" },
  };

  if (keyword) {
    const workshops = await mechanicWorkshopModel
      .find(name_query)
      .populate({ path: "location", select: "latitude longitude -_id" });
    const maintenceCenters = await maintenanceCenterModel
      .find(ar_en_name_query)
      .populate({ path: "location", select: "latitude longitude -_id" });
    const gasStations = await gasStationModel
      .find(name_query)
      .populate({ path: "location", select: "latitude longitude -_id" });

    let searchResult = [];
    if (workshops) searchResult.push(...workshops);
    if (maintenceCenters) searchResult.push(...maintenceCenters);
    if (gasStations) searchResult.push(...gasStations);

    searchResult = getNearestPlaces(searchResult, latitude, longitude);

    res.status(200).json({ results: searchResult.length, data: searchResult });
  } else {
    return next(AppError("No search keyword is provided", 400));
  }
});

exports.deleteOne = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findOneAndDelete({ _id: id });
    if (!document) {
      return next(new AppError(`No document found for this id ${id}`, 400));
    }

    res.status(204).send();
  });

exports.updateOne = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new AppError(`No document found for this id: ${req.params.id}`, 400)
      );
    }

    res.status(200).json({
      data: document,
    });
  });

exports.createOne = (Model) =>
  catchAsyncErr(async (req, res) => {
    const document = await Model.create(req.body);

    res.status(200).json({
      data: document,
    });
  });

exports.getOne = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new AppError(`No document found for this id ${id}`, 400));
    }
    res.status(200).json({
      data: document,
    });
  });

exports.getAll = (Model, modelName = "") =>
  catchAsyncErr(async (req, res) => {
    let filter = {};
    if (req.filterObject) {
      filter = req.filterObject;
    }
    const documentsCounts = await Model.countDocuments();
    //Build query
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .fields()
      .sort()
      .filter();

    const { mongooseQuery, paginationResult } = apiFeatures;

    const documents = await mongooseQuery;
    res.status(200).json({
      results: documents.length,
      data: documents,
    });
  });
