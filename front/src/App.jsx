import { useState, useEffect } from 'react'
import './assets/css/App.css'
import { prettify } from './helpers/debug.js';
import TaskColumn from './components/TaskColumn.jsx'
import { API_URL } from './helpers/utils.js';




const COLUMNS = ['To do', 'In progress', 'In review', 'Done']
const DEADLINE = 3 * 24 * 60 * 60 * 1000;

function App() {
  // const [newRoomName, setNewRoomName] = useState(localStorage.getItem(LS_ROOMNAME) || 'New Room');
  // useEffect(() => { localStorage.setItem(LS_ROOMNAME, newRoomName); }, [newRoomName]);

  const [tasks, setTasks] = useState([]);

  //useEffect(() => { if (!current) return; }, [current]);
  useEffect(() => {
    const fetchTasks = async () => {
      const resp = await fetch(`${API_URL}tasks`);
      const result = await resp.json();
      setTasks(result);
    }
    fetchTasks();


  }, []);

  /*
    const saveHandler = async (todoData) => {
      // get max order
      let order = 0;
      for (const t of todos) {
        if (t.order > order) {
          order = t.order;
        }
      }
      order++;
  
      const preparedData =
      {
        ...todoData,
        order: order
      }
  
      try {
        const resp = await fetch(`${API_URL}todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(preparedData) // Отправляем всю пачку rows
        });
        const result = await resp.json();
        setTodos(prev => [...prev, result])
        // alert(JSON.stringify(result));
      }
      catch (e) {
  
      }
    }
  
    const handleDelete = async (id) => {
  
      try {
        const resp = await fetch(`${API_URL}todos`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id }) // Отправляем всю пачку rows
        });
        // const result = await resp.json();
        if (resp.ok) {
          // Убираем из стейта то, что удалили
          setTodos(prev => prev.filter(todo => todo.id !== id));
        }
      }
      catch (e) { }
    }
  */
  const handleCreate = async () => {

    try {
      let order = 0;
      for (const t of tasks) {
        if (t.state === 0 && t.order > order) {
          order = t.order;
        }
      }
      order++;

      // calc order
      const taskData = {
        state: 0,
        order: order,
        deadline: Date.now() + DEADLINE
      }




      const resp = await fetch(`${API_URL}tasks`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
      });
      const result = await resp.json();
      if (resp.ok) {

        setTasks(prev =>
          [...prev,
            result
          ]
        )
      }
    }
    catch (e) { console.error(e) }
  }

  const handleDelete = async (taskId) => {
    // alert(taskId);

    const resp = await fetch(`${API_URL}tasks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId: taskId })
    });
    const result = await resp.json();
    if (resp.ok) {
      setTasks(prev => prev.filter(t => t.id !== result.id));

      // alert(prettify(result));
    }

  }

  const handleUpdate = (updatedTask) => {
    setTasks(prev => prev.map(t =>
      t.id === updatedTask.id ? updatedTask : t
    ));
  };
  return (

    <>
      {COLUMNS.map((c, i) =>
        <TaskColumn
          key={i}
          header={c}
          tasks={tasks}
          state={i}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      )}

    </>


  )
}

export default App
