import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import UserForm from "../components/UserForm";

export default function Home() {
  const dispatch = useDispatch();
  const { list: users, loading, error, searchQuery } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filtrimi i përdoruesve sipas kërkimit
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👥 User Management</h1>

      {/* Formulari për shtim të përdoruesit të ri */}
      <UserForm />

      {/* Kërkimi */}
      <SearchBar />

      {/* Lista e përdoruesve */}
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      <div style={styles.userList}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  userList: {
    marginTop: "20px",
  },
};
