import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const URL = 'https://task-list-api-c17.herokuapp.com';

  useEffect(() => {
    axios
      .get(`${URL}/tasks`)
      .then((response) => {
        // const tasksObject = response.data;
        // const newTasks = [];
        // for (const task in tasksObject) {
        //   newTasks.push(task);
        // }
        // console.log(response);
        const newTasks = response.data.map((task) => {
          return {
            id: task.id,
            // description: task.description,
            title: task.title,
            isComplete: task.is_complete,
          };
        });
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleComplete = (id) => {
    const newTasks = [];
    let complete = 'mark_complete';
    for (const task of tasks) {
      if (id === task.id) {
        task.isComplete = !task.isComplete;
        if (task.isComplete) {
          complete = 'mark_complete';
        } else {
          complete = 'mark_incomplete';
        }
      }
      newTasks.push(task);
    }
    axios
      .patch(`${URL}/tasks/${id}/${complete}`)
      .then(() => {
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`${URL}/tasks/${id}`)
      .then(() => {
        const newTasks = [];
        for (const t of tasks) {
          const task = { ...t };
          if (id !== task.id) {
            newTasks.push(task);
          }
        }
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              onClickCallback={toggleComplete}
              deleteTaskCallback={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
