"use client";
import Select from "@/components/Select/Select";
import { Filters as FilterArrIn } from "@/hooks/useTableActions";
import { CameraData } from "@/store/interfaces/cameraInterface";
import { getUniqueArrayByKey, makeOptions } from "@/utilities/helpers";
import React, { useMemo } from "react";
import { BiWifi } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
interface TableFiltersIn {
  cameraList: CameraData[];
  filters: FilterArrIn;
  setFilter: (key: string, value: any) => void;
}

const TableFilters = ({ cameraList, filters, setFilter }: TableFiltersIn) => {
  const statusOptions = useMemo(() => {
    return [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ];
  }, []);

  const locationOptions = useMemo(() => {
    return makeOptions(
      getUniqueArrayByKey(cameraList || [], "location"),
      "location",
      "location"
    );
  }, [cameraList]);

  return (
    <div className="flex xl:flex-row flex-col xl:items-center gap-3 w-full xl:max-w-[500px]">
      <Select
        options={locationOptions}
        value={String(filters?.location) || ""}
        onChange={loc => setFilter("location", loc)}
        leftIcon={<GoLocation className="text-lg text-gray-700" />}
        placeholder="Location"
      />
      <Select
        options={statusOptions}
        value={String(filters?.status) || ""}
        onChange={val => setFilter("status", val)}
        leftIcon={
          <BiWifi className="text-lg text-gray-700 transform rotate-45" />
        }
        placeholder="Status"
      />
    </div>
  );
};

export default TableFilters;
