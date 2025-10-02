import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <div style={styles.card}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.company?.name}</p>
      <Link to={`/user/${user.id}`} style={styles.link}>View Details ➜</Link>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "10px",
    background: "#f9f9f9",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
};
