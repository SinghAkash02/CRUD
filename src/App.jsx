import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ViewUser from "./pages/ViewUser";

function App() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <h3 className="text-white">
            React CRUD Dashboard
          </h3>
        </div>
      </nav>

      <BrowserRouter>

      

      <div className="container mt-4">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/view/:id" element={<ViewUser />} />
        </Routes>

      </div>

    </BrowserRouter>
    </>
    
  );
}

export default App;