import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import axios from "axios";

class TodosList extends Component {
  state = {
    todos: []
  };

  componentDidMount = () => {
    axios
      .get("/todos/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  todoList = () => {
    return this.state.todos.map(function(currentTodo, i) {
      return (
        <tr>
          <td className={currentTodo.todo_completed ? "completed" : ""}>
            {currentTodo.todo_description}
          </td>
          <td className={currentTodo.todo_completed ? "completed" : ""}>
            {currentTodo.todo_responsible}
          </td>
          <td className={currentTodo.todo_completed ? "completed" : ""}>
            {currentTodo.todo_priority}
          </td>
          <td>
            <Link to={"/edit/" + currentTodo._id}>Edit</Link>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <p>Welcome to Todos List Component!!</p>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}

export default TodosList;
