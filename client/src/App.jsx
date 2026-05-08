import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./pages/Login";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [project, setProject] = useState("");
const [team, setTeam] = useState("");
  const [dueDate, setDueDate] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://team-task-managerr-production-60d6.up.railway.app/api/tasks",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // LOAD TASKS
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, []);

  // ADD TASK
 const addTask = async () => {
  try {
    await axios.post(
      "https://team-task-managerr-production-60d6.up.railway.app/api/tasks/create",
      {
        title,
        description,
        assignedTo,
        project,
        team,
        dueDate
      }
    );

    fetchTasks();

    setTitle("");
    setDescription("");
    setAssignedTo("");
    setProject("");
    setTeam("");
    setDueDate("");

  } catch (error) {
    console.log(error);
  }
};

  // COMPLETE TASK
  const completeTask = async (id) => {
    try {
      await axios.put(
        `https://team-task-managerr-production-60d6.up.railway.app/api/tasks/${id}`,
        {
          status: "completed",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://team-task-managerr-production-60d6.up.railway.app/api/tasks/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.reload();
  };

  // IF NOT LOGGED IN
  if (!token) {
  return <Login />;
}

  return (
    <div className="container">
      <h1>Team Task Manager</h1>
      <div className="dashboard-container">

  <h2 className="dashboard-title">
    Dashboard
  </h2>

  <div className="dashboard-stats">

    <div className="stat-box">
      <h3>Total Tasks</h3>
      <p>{tasks.length}</p>
    </div>

    <div className="stat-box">
      <h3>Completed</h3>
      <p>
        {
          tasks.filter(
            task => task.status === "completed"
          ).length
        }
      </p>
    </div>

    <div className="stat-box">
      <h3>Pending</h3>
      <p>
        {
          tasks.filter(
            task => task.status === "pending"
          ).length
        }
      </p>
    </div>

  </div>

</div>

      <button
  className="logout-btn"
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  }}
>
  Logout
</button>

      <hr />

      {/* ADMIN ONLY ADD TASK */}
      {role === "admin" && (
        <div className="task-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
          <input
  type="text"
  placeholder="Project Name"
  value={project}
  onChange={(e) => setProject(e.target.value)}
/>

<input
  type="text"
  placeholder="Team Name"
  value={team}
  onChange={(e) => setTeam(e.target.value)}
/>
          <br />
<br />

<input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
/>

          <br />
          <br />

          <button onClick={addTask}>Add Task</button>

          <hr />
        </div>
      )}

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div
          key={task._id}
          className="task-card"
        >
          <h2>{task.title}</h2>

          <p>{task.description}</p>

          <p>
  <strong>Project:</strong> {task.project}
</p>

<p>
  <strong>Team:</strong> {task.team}
</p>

          <p>Status: {task.status}</p>
 <p>
  Due Date:
  {" "}
  {task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No Due Date"}
</p>
{
  task.dueDate &&
  task.status !== "completed" &&
  new Date(task.dueDate) < new Date() && (
    <p style={{ color: "red" }}>
      Overdue
    </p>
  )
}

          <p>Assigned To: {task.assignedTo}</p>

          {/* COMPLETE BUTTON FOR EVERYONE */}
          <button onClick={() => completeTask(task._id)}>
            Complete
          </button>

          {/* DELETE ONLY FOR ADMIN */}
          {role === "admin" && (
            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;