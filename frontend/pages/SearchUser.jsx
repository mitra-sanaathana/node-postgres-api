import { useState } from "react";
import API from "../services/api";

function SearchUser() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    const res = await API.get(`/users/search/${name}`);
    setUsers(res.data);
  };

  return (
    <div>
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default SearchUser;