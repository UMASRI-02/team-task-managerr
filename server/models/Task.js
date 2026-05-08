const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  },

  assignedTo: {
    type: String
  },

  project: {
    type:String,
  },
team: {
  type:String,
},

  dueDate: {
    type: Date
  }

});

module.exports = mongoose.model("Task", TaskSchema);