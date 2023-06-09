const nodemailer = require("nodemailer");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");
module.exports.sendEmail=async(options)=>{
    let transporter = nodemailer.createTransport({
       service:"gmail",
        auth: {
          user: "vewww.vew@gmail.com ", // generated ethereal user
          pass: "cgjnxcjvmxmkuizq", // generated ethereal password
        },
      });
       
      let modelApiName="driver";
      if(model.collection.collectionName=== "winches") modelApiName = "winch";
      if(model.collection.collectionName=== "mechanicworkshops") modelApiName = "mechanic";

      let info =  transporter.sendMail({
        from: '"vewww 👻" <vewww.vew@gmail.com >', // sender address
        to: options.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <div style="background:#bbf;padding:20px">
        <h1>${options.message}</h1>
        <a href="http://localhost:3000/${modelApiName}/verify/${options.token}">verify</a>
        </div>
        `, 
      },(err,info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }

      });
}
