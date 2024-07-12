const mongoose = require("mongoose");
const todoListData = new mongoose.Schema({
  todaysWork: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  //   time: {
  //     type: Date,
  //     default: Date.time(),
  //   },
});

const TodoListInput = mongoose.model("TodoListInput", todoListData);
module.exports = TodoListInput;
