const nodemailer = require("nodemailer");
const { catchAsyncErr } = require("../../utils/CatchAsyncErr");

module.exports.resetPass = catchAsyncErr(async (options, role) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vewww.vew@gmail.com", // generated ethereal user
      pass: "cgjnxcjvmxmkuizq", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"vewww 👻" <vewww.vew@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `
      <div style="background:#bbf;padding:20px">
        <h1>${options.message}</h1>
        <a href="${process.env.BaseUrl}/allusers/verifyPassword/${options.token}">reset password</a>
      </div>
    `,
  });

  console.log("Email sent:", info.messageId);
});
