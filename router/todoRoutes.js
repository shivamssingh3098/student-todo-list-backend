const express = require("express");
const router = express.Router();
const todoList = require("../controller/todoList");

router
  .route("/")
  .post(todoList.insertTodoList)
  .get(todoList.getAllTodoList)

  .put(todoList.editTodoList);
router.route("/:id").delete(todoList.deleteTodoList);

module.exports = router;
