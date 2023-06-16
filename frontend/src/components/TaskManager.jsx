import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskManager.css';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [editTask, setEditTask] = useState(null);


    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios
            .get('http://127.0.0.1:5000/tasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAddTask = (event) => {
        event.preventDefault();
        // Make an API request to add a new task
        axios
            .post('http://127.0.0.1:5000/tasks', newTask)
            .then((response) => {
                fetchTasks();
                setNewTask({ title: '', description: '' });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDeleteTask = (taskId) => {
        // Make an API request to delete the task
        axios
            .delete(`http://127.0.0.1:5000/tasks/${taskId}`)
            .then((response) => {
                fetchTasks();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const startEditTask = (taskId) => {
        setEditTask(taskId);
      };
      
      const handleEditInputChange = (taskId, field, value) => {
        // Update the task field in the state
        setTasks((prevTasks) => {
          return prevTasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, [field]: value };
            }
            return task;
          });
        });
      };
      
      const handleUpdateTask = (event) => {
        event.preventDefault();
        // Get the edited task from the state
        const editedTask = tasks.find((task) => task.id === editTask);
        if (editedTask) {
          // Make an API request to update the task
          axios
            .put(`http://127.0.0.1:5000/tasks/${editTask}`, editedTask)
            .then((response) => {
              fetchTasks();
              setEditTask(null);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
      
      const cancelEditTask = () => {
        setEditTask(null);
      };
      

    return (
  <div>
    <h1 className="task-manager-heading">Todo List</h1>
    <div className="task-manager-container">
      <div className="left-div">
          <form className="task-manager-form" onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
            />
            <button className="task-manager-button" type="submit">
              Add Task
            </button>
          </form>
        </div>
      <div className="right-div">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                {editTask === task.id ? (
                  <td>
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => handleEditInputChange(task.id, 'title', e.target.value)}
                    />
                  </td>
                ) : (
                  <td>{task.title}</td>
                )}
                {editTask === task.id ? (
                  <td>
                    <input
                      type="text"
                      value={task.description}
                      onChange={(e) => handleEditInputChange(task.id, 'description', e.target.value)}
                    />
                  </td>
                ) : (
                  <td>{task.description}</td>
                )}
                <td>
                  {editTask === task.id ? (
                    <button type="submit" onClick={handleUpdateTask}>
                      Save
                    </button>
                  ) : (
                    <button onClick={() => startEditTask(task.id)}>Edit</button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

}

export default TaskManager;
