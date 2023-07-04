const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const schema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'owner name is required'],
  },
  email: {
    type: String,
    require: [true, 'email is required'],
  },
  password: {
    type: String,
    require: [true, 'password is required'],

    min: 6,
  },
  phoneNumber: {
    type: String,
    require: [true, 'phone number is required'],
  },

  report: {
    reportsNumber: {
      type: Number,

      default: 0,
    },
    dateReport: {
      type: Date,
      default: function () {
        return Date.now();
      },
    },
  },
  rate: {
    type: Number,
    default: 0,
  },
  numOfRates: {
    type: Number,
    default: 0,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  emailConfirm: {
    type: Boolean,
    default: false,
  },
  location: {
    latitude: {
      type: Number,
      require: [true, 'Latitude required'],
    },
    longitude: {
      type: Number,
      require: [true, 'Longitude required'],
    },
  },
  logedIn: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'winch',
  },
  plateNumber: {
    type: String,
    required: [true, 'plate number required'],
  },
  available: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: {
    type: Date},
});
schema.pre('save', async function (next) {
  if (!this.password.startsWith('$')) {
    this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
  }
  next();
});
schema.pre('findOneAndUpdate', async function () {
  if (!this._update.password) return;
  this._update.password = await bcrypt.hash(this._update.password, Number(process.env.ROUND));
});
module.exports = mongoose.model('winch', schema);
