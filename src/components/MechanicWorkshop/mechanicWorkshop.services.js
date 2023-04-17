const express = require("express");
const winchModel = require("./mechanicWorkshop.model");
const router = express.Router();

router.post("/", async (req, res) => {
    await winch.create({
     ownerName: req.body.ownerName,
      email: req.body.email,
      password: req.body.password,
      mechanicPhone:req.body.mechanicPhone,
      workshopName:req.body.workshopName,
      phoneNumber:req.body.phoneNumber,
      hasDelivery:req.body.hasDelivery,
      services:req.body.services
        });
    res.send({ message: "created" });
  });

  module.exports=router;