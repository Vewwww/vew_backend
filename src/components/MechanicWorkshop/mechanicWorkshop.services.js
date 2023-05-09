const express = require("express");
const MechanicModel = require("./mechanicWorkshop.model");
const factory = require('../Handlers/handler.factory')

exports.signup=factory.signup(MechanicModel)
exports.signin=factory.signin()
exports.emailVerify=factory.emailVerify(MechanicModel)


// router.post("/", async (req, res) => {
//     await winch.create({
//      ownerName: req.body.ownerName,
//       email: req.body.email,
//       password: req.body.password,
//       mechanicPhone:req.body.mechanicPhone,
//       workshopName:req.body.workshopName,
//       phoneNumber:req.body.phoneNumber,
//       hasDelivery:req.body.hasDelivery,
//       services:req.body.services
//         });
//     res.send({ message: "created" });
//   });

//   module.exports=router;