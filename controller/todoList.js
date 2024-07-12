const TodoListInput = require("../model/todoList");

exports.insertTodoList = async (req, res) => {
  const { todaysWork } = req.body;
  try {
    const todoList = await TodoListInput.create({ todaysWork });
    res.status(200).json({
      status: "success",
      message: "successfully inserted",
      data: todoList,
    });
  } catch (err) {
    console.log("nhui hya", err);
  }
};

exports.getAllTodoList = async (req, res) => {
  try {
    const todoList = await TodoListInput.find();
    res.status(200).json({
      status: "success",
      data: todoList,
    });
    // res.send(todoList);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodoList = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id is   " + id);
    const result = await TodoListInput.deleteOne({ _id: id });
    res.status(200).json({
      status: "deleted",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editTodoList = async (req, res) => {
  try {
    const { _id, todaysWork } = req.body;
    const result = await TodoListInput.findByIdAndUpdate(
      { _id: _id },
      {
        $set: { todaysWork: todaysWork },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(result);
    res.status(200).json({
      status: "updated",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
