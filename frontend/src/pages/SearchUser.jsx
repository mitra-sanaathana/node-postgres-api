import { useState } from "react";
import API from "../../services/api";

function SearchUser() {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);

  const searchUser = async () => {
    const res = await API.get(`/users/search/${name}`);
    setResults(res.data);
  };

  return (
    <div>
      <h1>Search User</h1>

      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={searchUser}>Search</button>

      {results.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchUser;