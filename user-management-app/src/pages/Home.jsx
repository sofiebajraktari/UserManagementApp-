import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import "./Home.css";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const dispatch = useDispatch();
  const { list: users, loading, error, searchQuery } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="home-page">
      <header className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">User Management</h1>
          <p className="hero-sub">Manage users — add, search, and view details quickly.</p>
        </div>
      </header>

      <section className="content container">
        <Sidebar />

        <section className="main-panel">
          <div className="controls">
            {loading && <div className="muted">Loading users...</div>}
            {error && <div className="error"> {error}</div>}
          </div>

          <SearchBar />
          <div className="user-grid">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
            ) : (
              <div className="muted">No users found.</div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
