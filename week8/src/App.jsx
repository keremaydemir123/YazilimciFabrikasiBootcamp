import React from "react";
import Pagination from "./components/Pagination";
import SearchInput from "./components/SearchInput";
import Table from "./components/Table";
import TableProvider from "./contexts/TableContext";

function App() {
  return (
    <div className="container flex flex-col gap-4">
      <TableProvider>
        <SearchInput />
        <Table />
        <Pagination />
      </TableProvider>
    </div>
  );
}

export default App;
