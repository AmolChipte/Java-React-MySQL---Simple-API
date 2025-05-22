import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(res => setUsers(res.data));
  }, []);

  const saveUser = () => {
    if (form.id) {

      // UPDATE
      axios.put(`http://localhost:8080/api/users/${form.id}`, form)
        .then(res => {
          setUsers(users.map(u => u.id === form.id ? res.data : u));
          setForm({ name: '', email: '' });
        });
    } else {

      // CREATE
      axios.post("http://localhost:8080/api/users", form)
        .then(res => {
          setUsers([...users, res.data]);
          setForm({ name: '', email: '' });
        });
    }
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`)
      .then(() => setUsers(users.filter(u => u.id !== id)));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Users</h1>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={saveUser}>{form.id ? "Update" : "Add"} User</button>

      <ul>
        <ul>
          {users.map(u => (
            <li key={u.id}>
              {u.name} ({u.email})
              <button onClick={() => deleteUser(u.id)}>🗑️</button>
              <button onClick={() => setForm({ id: u.id, name: u.name, email: u.email })}>✏️</button>
            </li>
          ))}
        </ul>

      </ul>
    </div>
  );
}

export default App;
