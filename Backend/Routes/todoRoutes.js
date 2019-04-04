const route = require("express").Router()

// Includes
const Todo = require("../models/todo.model");

// Get All Todos
route.get("/", (req, resp) => {
  Todo.find()
    .then(todos => {
      resp.json(todos);
    })
    .catch(err => {
      resp.json({ success: false, msg: "Something Went Wrong" });
    });
});

// Get One Todo Item
route.get("/:id", (req, resp) => {
  Todo.findById(req.params.id)
    .then(todo => {
      resp.json(todo);
    })
    .catch(err => {
      resp.json({ success: false, msg: "Something Went Wrong" });
    });
});

// Add New Todo Item
route.post("/add", (req, resp) => {
  const newTodo = new Todo(req.body);
  newTodo
    .save()
    .then(todo => {
      resp.json({ success: true, msg: "Todo Added Successfully", data: todo });
    })
    .catch(err => {
      resp.json({ success: false, msg: "Something Went Wrong" });
    });
});

// Update Todo Item
route.post("/update/:id", (req, resp) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (todo) {
      todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;
      todo
        .save()
        .then(res => {
          resp.json({ success: true, msg: "Todo Updated Successfully" });
        })
        .catch(err => {
          resp.json({
            success: false,
            msg: "Something Went Wrong while Updating"
          });
        });
    }
  }).catch(err => {
    resp.json({ success: false, msg: "Something Went Wrong" });
  });
});

module.exports = route;
