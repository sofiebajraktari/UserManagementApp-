# User Management App 

A small React app demonstrating components, routing, forms, data fetching, and basic state management.

Features
List users fetched from https://jsonplaceholder.typicode.com/users (stored in Redux)
Client-side search (by name or email) available in the top NavBar
Dashboard with statistics and sortable user list
User details page (/users/:id) showing address, phone, website and company
Add user (local only) with validation (name and email required)
Edit and Delete users (local, using Redux reducers)


Getting started (developer)
1. Install dependencies

```powershell
npm install
```

2. Run development server

```powershell
npm start
```

3. Open the app

Open http://localhost:3000 in your browser.

Basic testing
Add user: use the Add User form (right column on Dashboard) name and email required.
Edit user: click Edit on a user card, modify and save.
Delete user: click Delete on a user card and confirm.
Search: use the search box in the top NavBar it filters the Dashboard list.
Sorting: use the Sort control on the Dashboard to sort by name, email, or company.

Build for production

```powershell
npm run build
```

