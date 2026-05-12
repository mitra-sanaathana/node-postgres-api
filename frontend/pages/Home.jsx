import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>User Management System</h1>

      <Link to="/users">
        <button>View All Users</button>
      </Link>

      <Link to="/add-user">
        <button>Add User</button>
      </Link>

      <Link to="/search-user">
        <button>Search User</button>
      </Link>
    </div>
  );
}

export default Home;