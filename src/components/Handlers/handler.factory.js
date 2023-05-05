const AppError = require("../../utils/AppError")
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup =(model)=>{
    return catchAsyncErr(async (req, res, next) => {
        const isUser = await model.findOne({ email: req.body.email })
        if (isUser) 
            return next(new AppError("user already exists", 401));             
        
        let User = new model(req.body);
        await User.save();
        res.status(200).json(User);
    });
} 
exports.signin = (model)=>{
    return catchAsyncErr(async (req, res, next) => {
    const user = await model.findOne({ email: req.body.email })
    if (!user || ! await bcrypt.compare(req.body.password, user.password))
        return next(new AppError("incorrect email or password", 401));


    let token = jwt.sign({ name: user.name, userId: user._id }, process.env.JWT_KEY);

    res.status(200).json({ token });
});}