import { useEffect, useState } from "react";

type Filters = {
  [key: string]: string;
};

const useSearchAndFilter = <T extends Record<string, any>>(
  data: T[],
  searchKeys: (keyof T)[],
  rowsPerPageDefault: number = 5
) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPageState, setRowsPerPageState] =
    useState<number>(rowsPerPageDefault);

  const filteredData = data.filter(row => {
    const searchMatch = searchKeys.some(key =>
      row[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filterMatch = Object.keys(filters).every(
      key => !filters[key] || row[key] === filters[key]
    );

    return searchMatch && filterMatch;
  });

  const totalFilteredDataCount = filteredData.length;
  const totalPages = Math.ceil(totalFilteredDataCount / rowsPerPageState);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPageState,
    currentPage * rowsPerPageState
  );

  const startRange = (currentPage - 1) * rowsPerPageState + 1;
  const endRange = Math.min(
    currentPage * rowsPerPageState,
    totalFilteredDataCount
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () =>
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const setFilter = (key: string, value: any) => {
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const setRowsPerPage = (value: number) => {
    setRowsPerPageState(value);
    setCurrentPage(1);
  };

  const clearFiltersAndSearch = () => {
    setSearchQuery("");
    setFilters({});
    setCurrentPage(1);
  };

  const getHighlightedText = (text: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    clearFiltersAndSearch,
    paginatedData,
    currentPage,
    totalPages,
    rowsPerPageState,
    setRowsPerPage,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    getHighlightedText,
    startRange,
    endRange,
    totalFilteredDataCount,
  };
};

export default useSearchAndFilter;
