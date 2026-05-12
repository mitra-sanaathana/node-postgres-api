import { useState } from "react";
import API from "../../services/api";

function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    language: "",
    services: "",
  });

  const submit = async () => {
    await API.post("/users", form);
    alert("User added");
  };

  return (
    <div>
      <h1>Add User</h1>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <button onClick={submit}>Create</button>
    </div>
  );
}

export default AddUser;