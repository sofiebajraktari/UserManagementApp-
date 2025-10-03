import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../redux/userSlice";

export default function UserForm({ initialData = null, onClose = null } = {}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const nameRef = useRef(null);

  useEffect(()=>{ if (!initialData && nameRef.current) nameRef.current.focus(); }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required!");
      return;
    }

    if (initialData && initialData.id) {
      dispatch(updateUser({ id: initialData.id, updatedData: { name, email, company: { name: company || 'N/A' } } }));
    } else {
      const newUser = { id: Date.now(), name, email, company: { name: company || "N/A" } };
      dispatch(addUser(newUser));
  setSuccess('User added');
  setTimeout(()=>setSuccess(''), 1800);
    }

    setName("");
    setEmail("");
    setCompany("");
    setError("");
    if (typeof onClose === 'function') onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="page-card">
      <h2>{initialData && initialData.id ? 'Edit User' : 'Add New User'}</h2>

      <label className="form-label">Full name *</label>
      <input
        ref={nameRef}
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-input"
      />

      <label className="form-label">Email *</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
      />

      <label className="form-label">Company (optional)</label>
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="form-input"
      />

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <button type="submit" className="btn-primary">
        {initialData && initialData.id ? 'Save Changes' : ' Add User'}
      </button>
    </form>
  );
}
