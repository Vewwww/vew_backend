const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    en: {
      type: String,
      trim:true,
      require: [true, "Sign name is required"],
    },
    ar: {
      type: String,
      trim:true,
      require: [true, "من فضلك، ادخل عنوان العلامة"],
    }

  },
  image: {
    type:String
  },
  description: {
    en: {
      type: String,
      require: [true, "Sign description is required"],
    },
    ar: {
      type: String,
      require: [true, "من فضلك، ادخل معلومات عن العلامة"],
    },

  },

  solution: {
    en: {
      type: String,
      require: [true, "Solution is required"],

    },
    ar: {
      type: String,
      require: [true, "من فضلك، ادخل حل المشكلة"],
    },
  },

});
const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BaseUrl}/public/signs/${doc.image}`;
    doc.image = imageUrl;
  }
};
schema.post('init', (doc) => {
  setImageUrl(doc);
});

schema.post('save', (doc) => {
  setImageUrl(doc);
});

// schema.post('find', function(doc, next) {
//   doc.image = `${process.env.BaseUrl}/uploads/${doc.image}`
//   next();
// });
// schema.pre('create', function(doc,next) {
//   doc.image = `${process.env.BaseUrl}/uploads/signs/${doc.image}`
//   next();
// });
module.exports = mongoose.model("sign", schema);
