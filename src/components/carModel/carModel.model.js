const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
     type: String, 
     required: [true, "Arabic carType name required"] 
  },
  brand:{
    type: mongoose.Types.ObjectId,
    ref:"carType",
  }
});
module.exports = mongoose.model("carModel", schema);