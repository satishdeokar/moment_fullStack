const mongoose = require("mongoose");
const fieldSchema = mongoose.Schema({
    title: { type: String, required: true },
    comment: { type: String, required: true },
    photoUrl: { type: String, required: true },
    tags: { type: Array, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref : 'user' , trim : true ,required: true},
    updatedBy: { type: mongoose.Schema.ObjectId, ref : 'user' , trim : true ,required: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
module.exports = mongoose.model("moment", fieldSchema);