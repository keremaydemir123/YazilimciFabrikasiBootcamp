import {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";

const TableContext = createContext();

export function useTable() {
  return useContext(TableContext);
}

export default function TableProvider({ children }) {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [order, setOrder] = useState(true);
  const [page, setPage] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await response.json();
        setCoins(data);
        setFilteredCoins(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCoins();
  }, []);

  useLayoutEffect(() => {
    if (filteredCoins.length < page.currentPage * page.itemsPerPage) {
      setPage((prev) => ({ ...prev, currentPage: 1 }));
    }
  }, [filteredCoins]);

  const coinsCount = useMemo(() => filteredCoins.length, [filteredCoins]);

  const sort = (field) => {
    const sorted = sortArray({
      array: filteredCoins,
      field,
      order,
    });
    setOrder(!order);
    setFilteredCoins(sorted);
  };

  const filter = (search) => {
    const filtered = filterArray({
      array: coins,
      fields: ["name", "symbol"],
      param: search,
    });
    setFilteredCoins(filtered);
  };

  return (
    <TableContext.Provider
      value={{
        filteredCoins,
        page,
        setPage,
        coinsCount,
        sort,
        filter,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

// Pure functions
function sortArray({ array, field, order }) {
  return [...array].sort((a, b) => {
    if (a[field] < b[field]) {
      return order ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return order ? 1 : -1;
    }
    return 0;
  });
}

const filterArray = ({ array, fields, param }) => {
  if (!param.trim()) {
    return array;
  }
  return array.filter((el) => {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (el[field].toLowerCase().includes(param.toLowerCase())) {
        return true;
      }
    }
    return false;
  });
};
