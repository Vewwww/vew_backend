const multer = require("multer")
const AppError = require("./AppError")
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const { catchAsyncErr } = require("./CatchAsyncErr");


exports.resizeImage = catchAsyncErr(async (req, res, next) => {
  const fileName = `sign-${uuidv4()}-${Date.now()}.jpeg`;
  console.log(req.file);
  console.log(fileName);
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/signs/${fileName}`);

    req.body.image = fileName;
  }
  next();
});
exports.uploadSingleFile=(fieldName)=>{
    const storage=multer.memoryStorage()
    function fileFilter(req,file,cb){
        if(file.mimetype.startsWith('image')){
            cb(null,true)
        }
        else{
            cb(new AppError("images only",400),false)
        }
    }
    const upload=multer({storage,fileFilter})
    return upload.single(fieldName)
}
