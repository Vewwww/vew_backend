const mongoose = require("mongoose");

var chatSchema = new mongoose.Schema({
  room: {
    type: String,
    default: `${Date.now()}-${100000 + Math.random() * 900000}`,
    required: true,
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId }],
  chatName:{
    type:String,
    defualt:""
  },
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId },
      content: { type: String, max: 2000 },
      time: { type: Date, default: new Date() },
      seen: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("chat", chatSchema);
