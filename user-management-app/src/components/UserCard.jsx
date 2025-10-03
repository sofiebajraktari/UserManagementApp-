import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/userSlice";
import { openEditModal } from "../redux/uiSlice";

export default function UserCard({ user }) {
  const colorIdx = user.id ? Number(user.id) % 3 : 0;
  const colorClass = colorIdx === 0 ? "purple" : colorIdx === 1 ? "cyan" : "orange";
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Delete ${user.name}?`)) {
      dispatch(deleteUser(user.id));
    }
  };

  const handleEdit = () => {
    dispatch(openEditModal(user));
  };

  return (
    <article className="page-card user-card">
      <div className="meta">
        <div className={`avatar ${colorClass}`}>{initial}</div>
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>

      <div>
        <p className="link">{user.company?.name}</p>
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <button className="link-btn" onClick={handleEdit}>Edit</button>
          <button className="link-btn" onClick={handleDelete} style={{color:'var(--danger)'}}>Delete</button>
        </div>
  <Link to={`/users/${user.id}`} className="link">View →</Link>
      </div>
    </article>
  );
}
