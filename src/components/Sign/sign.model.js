const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    en_name: {
      type: String,
      trim:true,
      require: [true, "Sign name is required"],
    },
    ar_name: {
      type: String,
      trim:true,
      require: [true, "من فضلك، ادخل عنوان العلامة"],
    }

  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    en_description: {
      type: String,
      require: [true, "Sign description is required"],
    },
    ar_description: {
      type: String,
      require: [true, "من فضلك، ادخل معلومات عن العلامة"],
    },

  },

  solution: {
    en_solution: {
      type: String,
      require: [true, "Solution is required"],

    },
    ar_solution: {
      type: String,
      require: [true, "من فضلك، ادخل حل المشكلة"],
    },
  },

});

module.exports = mongoose.model("sign", schema);
