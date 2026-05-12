import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import SearchUser from "./pages/SearchUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/search-user" element={<SearchUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;