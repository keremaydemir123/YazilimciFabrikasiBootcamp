import React, { useRef, useState } from "react";
import { useTable } from "../contexts/TableContext";
import SearchIcon from "../icons/SearchIcon";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { filter } = useTable();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };

  return (
    <div className="form-control">
      <div className="input-group">
        <button className="btn btn-square btn-primary">
          <SearchIcon />
        </button>
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={handleSearch}
          className="input input-bordered input-primary"
        />
      </div>
    </div>
  );
}

export default SearchInput;
