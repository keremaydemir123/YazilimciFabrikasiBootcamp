import React from "react";
import { useTable } from "../contexts/TableContext";
import ArrowUpDown from "../icons/ArrowUpDown";

function ThDiv({ label, field }) {
  const { sort } = useTable();
  return (
    <div className="flex items-center">
      {label}
      <ArrowUpDown onClick={() => sort(field)} />
    </div>
  );
}

function Table() {
  const { filteredCoins, page } = useTable();

  const startIndex = (page.currentPage - 1) * page.itemsPerPage;
  const endIndex = startIndex + page.itemsPerPage;
  const filteredCoinsForPage = filteredCoins.slice(startIndex, endIndex);

  const pages = Array.from({ length: page.itemsPerPage }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-normal w-full text-sm p-4">
        <thead className="bg-base-300">
          <tr className="flex">
            <th className="flex-1"></th>
            <th scope="col" className="flex-[3]">
              <ThDiv label="Name" field="name" />
            </th>
            <th scope="col" className="flex-[3]">
              <ThDiv label="Symbol" field="symbol" />
            </th>
            <th scope="col" className="flex-[3]">
              <ThDiv label="Price" field="current_price" />
            </th>
            <th scope="col" className="flex-[3]">
              <ThDiv label="Change (%)" field="price_change_percentage_24h" />
            </th>
          </tr>
        </thead>
        <tbody>
          {pages?.map((num, index) => {
            if (!filteredCoinsForPage[index])
              return (
                <tr
                  key={index}
                  className="flex w-full font-semibold hover cursor-pointer bg-base-200 hover:bg-base-300"
                >
                  <td className="flex-1">-</td>
                </tr>
              );

            return (
              <tr
                key={filteredCoinsForPage[index].id}
                className="flex w-full md:text-md text-sm hover cursor-pointer bg-base-200 hover:bg-base-300"
              >
                <td className="flex-1">
                  {(page.currentPage - 1) * page.itemsPerPage + index + 1}
                </td>
                <td className="flex-[3] flex items-center">
                  <img
                    src={filteredCoinsForPage[index].image}
                    alt={filteredCoinsForPage[index].name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span>{filteredCoinsForPage[index].name}</span>
                </td>
                <td className="uppercase flex-[3] flex items-start">
                  {filteredCoinsForPage[index].symbol}
                </td>
                <td className="flex-[3] flex items-start">
                  {filteredCoinsForPage[index].current_price}$
                </td>
                <td
                  className={`flex-[3] flex items-start ${
                    filteredCoinsForPage[index].price_change_percentage_24h > 0
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {filteredCoinsForPage[index].price_change_percentage_24h}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
