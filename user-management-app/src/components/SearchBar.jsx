import React from "react";

export default function SearchBar({ query, onSearch }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "16px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px 14px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
};
