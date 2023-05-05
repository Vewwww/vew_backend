const express = require("express");
const signModel = require("./sign.model");
const router = express.Router();


router.post("/", async (req, res) => {
    await signModel.create({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      solution:req.body.solution
    });
    res.send({ message: "created" });
  });

  router.get("/", async (req, res) => {
    try {
      res.send(await signModel.find());
    } catch (error) {
      res.status(404).send({ message: "not found" });
    }
  });

  router.get("/one", async (req, res) => {
    try {
      nameSign= req.body.name,
      //const Sign = await userModel.findOne({ email: myemail });
      res.send(await signModel.findOne({name:nameSign}));
    } catch (error) {
      res.status(404).send({ message: "not found" });
    }
  });

  router.patch("/", async (req, res) => {
    try {
      newId=req.body.id
      newName = req.body.name;
      newDescription=req.body.description;
      newSolution=req.body.solution;
      await signModel.findByIdAndUpdate(newId,{name: newName, description: newDescription, solution:newSolution });
      res.send({ message: "updated" });
    } catch (error) {
      res.status(404).send({ message: "is not updated" });
    }
  });
  

  router.delete("/", async (req, res) => {
    try {
      name = req.body.name;
      await signModel.findOneAndDelete({ name: name });
      res.send({ message: "deleted" });
    } catch (error) {
      res.status(404).send({ message: "is not deleted" });
    }
  });

  module.exports=router;