import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/tasks")
      .then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (!task) return;
    axios
      .post(import.meta.env.VITE_API_URL + "/api/tasks", { title: task })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setTask("");
      });
  };

  const deleteTask = (id) => {
    axios.delete(import.meta.env.VITE_API_URL + `/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter((t) => t._id !== id));
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => deleteTask(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
