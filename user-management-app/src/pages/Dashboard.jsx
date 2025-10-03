import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "../components/UserCard";
import { openAddModal } from '../redux/uiSlice';
import { setSearchQuery } from "../redux/userSlice";

export default function Dashboard(){
  const users = useSelector(s => s.users.list || []);
  const search = useSelector(s => s.users.searchQuery || "");
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState('name');
  const [sortDir, setSortDir] = React.useState('asc');
  React.useEffect(() => {
    setPage(1);
  }, [search]);
  
  React.useEffect(() => { setPage(1); }, [sortBy, sortDir]);
  const pageSize = 10;
  const sorted = [...users].sort((a,b)=>{
    const extract = (u) => {
      if (!u) return '';
      if (sortBy === 'company') return (u.company && u.company.name) ? String(u.company.name) : '';
      return (u[sortBy] || '');
    };
    const aval = String(extract(a)).toLowerCase();
    const bval = String(extract(b)).toLowerCase();
    const cmp = aval.localeCompare(bval, undefined, { numeric: true, sensitivity: 'base' });
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const filtered = sorted.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) || (u.email || '').toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page-1)*pageSize, page*pageSize);

  const total = users.length;
  const companies = {};
  users.forEach(u => {
    const name = (u.company && u.company.name) ? u.company.name : 'Unknown';
    companies[name] = (companies[name] || 0) + 1;
  });

  const companyEntries = Object.entries(companies).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const max = companyEntries.length ? companyEntries[0][1] : 1;

  return (
    <main className="dashboard container">
      <h2>Dashboard</h2>

      <section className="stats">
        <div className="stat-card page-card">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total Users</div>
        </div>

        <div className="stat-card page-card">
          <div className="stat-value">{Object.keys(companies).length}</div>
          <div className="stat-label">Companies</div>
        </div>

        <div className="stat-card page-card">
          <div className="stat-value">{users.filter(u=>u.id && u.id < 1000).length}</div>
          <div className="stat-label">Imported Users</div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="left-col">
          <h3>Users</h3>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div className="sort-controls">
                <label className="muted sort-label">Sort:</label>
                <select className="sort-select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="company">Company</option>
                </select>
                <button className="sort-toggle" onClick={()=>setSortDir(d=>d==='asc'?'desc':'asc')} aria-label="Toggle sort direction">{sortDir==='asc'?'↑':'↓'}</button>
              </div>
              <input className="dashboard-search" placeholder="Search users..." value={search} onChange={(e)=>dispatch(setSearchQuery(e.target.value))} />
            </div>
            <div className="user-list">
              {paginated.map(u => <UserCard key={u.id} user={u} />)}
            </div>

            <div className="pagination">
              <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
              <span> Page {page} / {totalPages} </span>
              <button disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</button>
            </div>
        </div>

        <aside className="right-col page-card" id="add">
          <h3>Add User</h3>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            <p className="muted">Click below to open the Add User form.</p>
            <button className="btn-primary" onClick={()=>dispatch(openAddModal())}>Open Add User</button>
          </div>
        </aside>
      </section>

      <section className="chart page-card">
        <h3>Users by Company</h3>
        <div className="bars">
          {companyEntries.map(([name, count]) => {
            const pct = Math.round((count / max) * 100);
            return (
              <div key={name} className="bar-row">
                <div className="bar-label">{name}</div>
                <div className="bar-track"><div className="bar-fill" style={{width:`${pct}%`}}></div></div>
                <div className="bar-count">{count}</div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
