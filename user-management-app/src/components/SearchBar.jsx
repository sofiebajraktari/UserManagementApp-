import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/userSlice";

export default function SearchBar({ queryProp = undefined, onSearchProp = undefined }) {
  const dispatch = useDispatch();
  const query = useSelector((s) => s.users.searchQuery);

  const handle = (value) => {
    if (onSearchProp) onSearchProp(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={queryProp !== undefined ? queryProp : query}
        onChange={(e) => handle(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
