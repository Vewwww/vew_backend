const { catchAsyncErr } = require('../../utils/CatchAsyncErr');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');
const bcrypt = require('bcrypt');
const driverModel = require('../driver/driver.model');
const mechanicWorkshopModel = require('../MechanicWorkshop/mechanicWorkshop.model');
const winchModel = require('../winch/winch.model');
const { sendEmail } = require('./email.factory');
const { resetPass } = require('./forgetPassword');
exports.signup = (model) => {
  return catchAsyncErr(async (req, res, next) => {
    email = req.body.email;
    isUser = await driverModel.findOne({ email });
    if (!isUser) {
      isUser = await mechanicWorkshopModel.findOne({ email });
      if (!isUser) {
        isUser = await winchModel.findOne({ email });
      }
    }
    if (isUser) return next(new AppError('user already exists', 401));
    let token = jwt.sign({ email }, process.env.EMAIL_JWT_KEY);
    await sendEmail({ email, token, message: 'Hello' }, model);
    next();
  });
};

exports.login = catchAsyncErr(async (req, res, next) => {
  let user = await driverModel.findOne({ email: req.body.email });

  let modelName = 'driver';

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    user = await mechanicWorkshopModel.findOne({ email: req.body.email });
    modelName = 'mechanicworkshops';
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      user = await winchModel.findOne({ email: req.body.email });
      modelName = 'winches';
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new AppError('incorrect email or password', 401));
      }
    }
  }

  let token = jwt.sign({ modelName, userId: user._id }, process.env.JWT_KEY);

  if (user.isSuspended == true) {
    res.status(403).json({ message: 'user is suspended' });
  }

  if (user.emailConfirm === true) {
    user.logedIn = true;
    user.save();
    res.status(200).json({ token, user });
  } else {
    res.status(401).json({ message: 'Please confirm your email' });
  }
});

exports.emailVerify = (model) => {
  return catchAsyncErr(async (req, res, next) => {
    const { token } = req.params;
    jwt.verify(token, process.env.EMAIL_JWT_KEY, async (err, decoded) => {
      console.log(decoded);
      if (err) {
        return next(new AppError('invalid token', 401));
      } else {
        let user = await model.findOne({ email: decoded.email });
        if (user) {
          await model.findOneAndUpdate({ email: decoded.email }, { emailConfirm: true });

          res.status(200).send(`
            <h1 style="background:#fff">Email verified successfully!!!</h1>
            <h3>Now you can login</h3>`);
        } else {
          res.status(404).send(`<h1 style="background:#fff">user not found</h1>`);
        }
      }
    });
  });
};

exports.authinticate = (model) => {
  return catchAsyncErr(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new AppError('you are not logedin, please login to get access to this route'), 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    let currentUser = null;
    currentUser = await model.findById(decoded.userId);

    if (!currentUser) return next(new AppError('this user no longer exist', 401));

    if (currentUser.logedIn === false)
      return next(new AppError('you are no longer logedin, please login to get access to this route', 401));
    if (currentUser.passwordChangedAt) {
      const passwordChangedTimeStamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10);
      if (passwordChangedTimeStamp > decoded.iat)
        return next(new ApiError('user recently changed his password, please login again'), 401);
    }
    req.user = currentUser;
    next();
  });
};

exports.logout = catchAsyncErr(async (req, res, next) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not logedin, please login to get access to this route'), 401);
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  let currentUser = null;
  if (decoded.modelName === 'winches') {
    currentUser = await winchModel.findById(decoded.userId);
  } else if (decoded.modelName === 'mechanicworkshops') {
    currentUser = await mechanicWorkshopModel.findById(decoded.userId);
  } else {
    currentUser = await driverModel.findById(decoded.userId);
  }

  if (!currentUser) return next(new AppError('this user no longer exist', 401));

  if (currentUser.logedIn === true) {
    currentUser.logedIn = false;
    currentUser.save();
  }

  res.status(200).json({ message: 'loged out successfuly' });
});

//allowedTo('admin,'driver,)
//['admin,'driver']
exports.allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(new AppError('you are not authorized to access this route', 401));

    next();
  };
};

exports.changePassword = (model) => {
  return catchAsyncErr(async (req, res, next) => {
    const id = req.user._id;
    req.body.passwordChangedAt = Date.now();
    let user = await model.findById(id);
    !user && next(new AppError('User not found', 400));
    if (await bcrypt.compare(req.body.password, user.password)) {
      return next(new AppError('This is already your current password', 400));
    }
    user = await model.findByIdAndUpdate(id, { password: req.body.password }, { new: true });
    res.status(200).json(user);
  });
};

exports.forgetPassword = catchAsyncErr(async (req, res, next) => {
  const email = req.body.email;
  let user = await driverModel.findOne({ email: req.body.email });
  let role = 'drivers';
  if (!user) {
    user = await mechanicWorkshopModel.findOne({ email: req.body.email });
    role = 'mechanicWorkshops';
    if (!user) {
      user = await winchModel.findOne({ email: req.body.email });
      role = 'winches';
      if (!user) {
        return next(new AppError('incorrect email ', 401));
      }
    }
  }
  let token = jwt.sign({ role, email }, process.env.JWT_PASSWORD);
  await resetPass({ email, token, message: 'Reset Your Password' }, role);
  res.status(200).json('check your email');
});
exports.verifyPassword = catchAsyncErr(async (req, res, next) => {
  const { token } = req.params;
  jwt.verify(token, process.env.JWT_PASSWORD, async (err, decoded) => {
    if (err) {
      return next(new AppError('invalid token', 401));
    } else {
      const user = await driverModel.findOne({ email: decoded.email });
      let model = driverModel; // Default model
      if (!user) {
        user = await mechanicWorkshopModel.findOne({ email: decoded.email });
        model = mechanicWorkshopModel;

        if (!user) {
          user = await winchModel.findOne({ email: decoded.email });
          model = winchModel;
          if (!user) {
            return next(new AppError('incorrect email', 401));
          }
        }
      }
      if (user) {
        await model.findOneAndUpdate({ email: decoded.email }, { passwordReset: true });
        res.status(200).send(`<h1 style="background:#fff">please write a new password in the app</h1>`);
      } else {
        res.status(404).send(`<h1 style="background:#fff">user not found</h1>`);
      }
    }
  });
});

exports.resetPassword = catchAsyncErr(async (req, res, next) => {
  let user = await driverModel.findOne({ email: req.body.email });
  model = driverModel;
  if (!user) {
    user = await mechanicWorkshopModel.findOne({ email: req.body.email });
    model = mechanicWorkshopModel;
    if (!user) {
      user = await winchModel.findOne({ email: req.body.email });
      model = winchModel;
      if (!user) {
        return next(new AppError('incorrect email', 401));
      }
    }
  }
  if (user.passwordReset === true) {
    await model.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.password, passwordReset: false },
      { new: true }
    );
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: 'Please check your email' });
  }
});
