import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserDetails from "./pages/UserDetails";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import ModalRoot from "./components/ModalRoot";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './redux/userSlice';
import EditModalRoot from "./components/EditModalRoot";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{ dispatch(fetchUsers()); }, [dispatch]);
  return (
    <Router>
  <NavBar />
  <ModalRoot />
  <EditModalRoot />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
  <Route path="/users" element={<Navigate to="/" replace />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}
export default App;
