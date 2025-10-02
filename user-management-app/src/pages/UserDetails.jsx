import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const users = useSelector((state) => state.users.list);

  const user = users.find((u) => u.id.toString() === id);

  if (!user) {
    return (
      <div style={styles.container}>
        <h2>User Not Found ❌</h2>
        <Link to="/" style={styles.backBtn}>⬅️ Back to Users</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Company:</strong> {user.company?.name || "N/A"}</p>
      <p><strong>ID:</strong> {user.id}</p>

      <Link to="/" style={styles.backBtn}>⬅️ Back to Users</Link>
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "500px",
    margin: "40px auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    lineHeight: "1.6",
  },
  title: {
    marginBottom: "20px",
  },
  backBtn: {
    display: "inline-block",
    marginTop: "20px",
    textDecoration: "none",
    background: "#007bff",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "6px",
  },
};
