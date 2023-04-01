import React from "react";
import { useTable } from "../contexts/TableContext";

function Pagination() {
  const { page, setPage, coinsCount } = useTable();
  const pages = Array.from(
    { length: Math.ceil(coinsCount / page.itemsPerPage) },
    (_, i) => i + 1
  );

  const handlePageChange = (page) => {
    setPage((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="flex justify-between gap-4">
      <div className="flex-1 w-full flex flex-wrap">
        {pages.map((num) => {
          return (
            <button
              key={num}
              className={`btn rounded-none w-12 ${
                page.currentPage === num ? "btn-primary" : ""
              }`}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </button>
          );
        })}
      </div>

      <div className="form-control max-w-xs">
        <select
          className="select select-bordered select-primary"
          value={page.itemsPerPage}
          onChange={(e) =>
            setPage((prev) => ({ ...prev, itemsPerPage: e.target.value }))
          }
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <label className="label">
          <span className="label label-text-alt">Set Display Size</span>
        </label>
      </div>
    </div>
  );
}

export default Pagination;
