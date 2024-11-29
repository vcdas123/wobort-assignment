"use client";
import Select from "@/components/Select/Select";
import React, { useMemo } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface TablePaginationIn {
  rowsPerPageState: number;
  setRowsPerPage: (value: number) => void;
  startRange: number;
  endRange: number;
  totalFilteredDataCount: number;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const TablePagination = ({
  rowsPerPageState,
  setRowsPerPage,
  endRange,
  startRange,
  totalFilteredDataCount,
  goToNextPage,
  goToPreviousPage,
  goToFirstPage,
  goToLastPage,
}: TablePaginationIn) => {
  const options = useMemo(() => {
    return [
      {
        label: "5",
        value: "5",
      },
      {
        label: "10",
        value: "10",
      },
      {
        label: "15",
        value: "15",
      },
      {
        label: "20",
        value: "20",
      },
      {
        label: "25",
        value: "25",
      },
    ];
  }, []);
  return (
    <div className="flex justify-end items-center bg-white w-full py-1 px-4 gap-4">
      <div className="min-w-[80px]">
        <Select
          withCloseBtn={false}
          disableBorder={true}
          options={options}
          value={String(rowsPerPageState)}
          onChange={total => setRowsPerPage(Number(total))}
        />
      </div>
      <p className="text-sm">
        {startRange}-{endRange} of {totalFilteredDataCount}
      </p>
      <div className="flex gap-2">
        <MdKeyboardDoubleArrowLeft
          className="text-xl text-gray-800 cursor-pointer hover:text-gray-500"
          onClick={goToFirstPage}
        />
        <MdKeyboardArrowLeft
          className="text-xl text-gray-800 cursor-pointer hover:text-gray-500"
          onClick={goToPreviousPage}
        />
        <MdKeyboardArrowRight
          className="text-xl text-gray-800 cursor-pointer hover:text-gray-500"
          onClick={goToNextPage}
        />
        <MdKeyboardDoubleArrowRight
          className="text-xl text-gray-800 cursor-pointer hover:text-gray-500"
          onClick={goToLastPage}
        />
      </div>
    </div>
  );
};

export default TablePagination;
