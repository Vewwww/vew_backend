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
    type:String
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
const setImageUrl = (doc) => {
  //return image base url + image name
  if (doc.image) {
    const imageUrl = `${process.env.BaseUrl}/signs/${doc.image}`;
    doc.image = imageUrl;
  }
};
schema.post('init', (doc) => {
  setImageUrl(doc);
});

// schema.pre('create', (doc) => {
//   setImageUrl(doc);
// });

// schema.post('find', function(doc, next) {
//   doc.image = `${process.env.BaseUrl}/uploads/${doc.image}`
//   next();
// });
// schema.pre('create', function(doc,next) {
//   doc.image = `${process.env.BaseUrl}/uploads/signs/${doc.image}`
//   next();
// });
module.exports = mongoose.model("sign", schema);
