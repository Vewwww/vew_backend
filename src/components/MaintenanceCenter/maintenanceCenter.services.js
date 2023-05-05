const express = require("express");
const maintanenceCenterModel = require("./maintenanceCenter.model");
const router = express.Router();


router.post("/", async (req, res) => {
    await maintanenceCenterModel.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      carType: req.body.carType,
      isVerified:req.body.isVerified,
      rate:req.body.rate
    });
    res.send({ message: "created" });
  });

  router.get("/", async (req, res) => {
    try {
      res.send(await maintanenceCenterModel.find());
    } catch (error) {
      res.status(404).send({ message: "not found" });
    }
  });

  router.get("/one", async (req, res) => {
    try {
      maintanenceName= req.body.name,
      res.send(await maintanenceCenterModel.findOne({name:maintanenceName}));
    } catch (error) {
      res.status(404).send({ message: "not found" });
    }
  });

  router.patch("/", async (req, res) => {
    try {
      newId=req.body.id
      newName = req.body.name;
      newphoneNumber=req.body.phoneNumber;
      newCarType=req.body.carType,
      newIsVerified=req.body.isVerified,
      newRate=req.body.rate
      await maintanenceCenterModel.findByIdAndUpdate(newId,{name: newName, phoneNumber: newphoneNumber,
        carType:newCarType,isVerified:newIsVerified ,rate:newRate});
      res.send({ message: "updated" });
    } catch (error) {
      res.status(404).send({ message: "is not updated" });
    }
  });
  

  router.delete("/", async (req, res) => {
    try {
      name = req.body.name;
      await maintanenceCenterModel.findOneAndDelete({ name: name });
      res.send({ message: "deleted" });
    } catch (error) {
      res.status(404).send({ message: "is not deleted" });
    }
  });

  module.exports=router;