"use client";
import logo from "/public/wobot_logo_blue.svg";
import Image from "next/image";
import Select from "@/components/Select/Select";
import { useMemo, useState } from "react";
import { GoLocation } from "react-icons/go";
import { BiWifi } from "react-icons/bi";
import {
  useChangeStatusMutation,
  useGetCameraListQuery,
} from "@/store/api/cameraApi";
import {
  getUniqueArrayByKey,
  hasValue,
  makeOptions,
} from "@/utilities/helpers";
import Table from "@/components/Table/Table";
import Checkbox from "@/components/Checkbox/Checkbox";
import {
  CameraData,
  StatusChangePayload,
  statusType,
} from "@/store/interfaces/cameraInterface";
import CameraName from "@/components/Camera/CameraName/CameraName";
import Badge from "@/components/Badge/Badge";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { STATIC_DATA } from "@/utilities/data";
import useSearchAndFilter from "@/hooks/useTableActions";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Title from "@/components/Title/Title";
import Input from "@/components/Input/Input";
import { IoSearchOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Spinner from "@/components/Loaders/Spinner";

const cameraList = STATIC_DATA?.data;

export default function Home() {
  // const {
  //   data: cameraList,
  //   isLoading,
  //   refetch,
  //   isFetching,
  // } = useGetCameraListQuery();
  const [changeStatus, { isLoading: changingStatus }] =
    useChangeStatusMutation();
  const [selItem, setSelItem] = useState<CameraData | undefined>();

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

  const searchKeys = ["name", "location", "status", "recorder", "tasks"] as any;

  const {
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
  } = useSearchAndFilter(cameraList || [], searchKeys);

  const changeStatusHandler = async (
    status: statusType,
    cameraItem: CameraData
  ) => {
    if (changingStatus) return;
    try {
      const PAYLOAD: StatusChangePayload = {
        id: Number(cameraItem?.id),
        status,
      };
      const res = await changeStatus(PAYLOAD).unwrap();
      if (res && Number(res?.status) === 200) {
        toast.success(res?.message || "Status Changed!");
        // refetch();
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <section className="container mt-5 flex flex-col gap-5">
      <div className="flex justify-center items-center">
        <Image src={logo.src} alt="logo" height={36} width={162.62} priority />
      </div>
      <Title
        rightSection={
          <Input
            rightSection={<IoSearchOutline className="text-lg text-gray-600" />}
            placeholder="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e?.target?.value)}
          />
        }
      />
      <div className="flex flex-col gap-1">
        <div className="bg-white py-1 px-2 w-full flex justify-between">
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
        </div>
        <div className="flex flex-col gap-[4px]">
          <Table maxHeight="700px">
            <Table.Head>
              <Table.Tr>
                <Table.Th>
                  <Checkbox />
                </Table.Th>
                <Table.Th>NAME</Table.Th>
                <Table.Th>HEALTH</Table.Th>
                <Table.Th>LOCATION</Table.Th>
                <Table.Th>RECORDER</Table.Th>
                <Table.Th>TASKS</Table.Th>
                <Table.Th>STATUS</Table.Th>
                <Table.Th>ACTIONS</Table.Th>
              </Table.Tr>
            </Table.Head>
            <Table.Body>
              {paginatedData?.map((camera: CameraData, idx: number) => (
                <Table.Tr key={camera?.id}>
                  <Table.Td>
                    <Checkbox />
                  </Table.Td>
                  <Table.Td>
                    <CameraName
                      cameraItem={camera}
                      getHighlightedText={getHighlightedText}
                    />
                  </Table.Td>
                  <Table.Td>{camera?.health?.cloud}</Table.Td>
                  <Table.Td>
                    {getHighlightedText(hasValue(camera?.location))}
                  </Table.Td>
                  <Table.Td>
                    {getHighlightedText(hasValue(camera?.recorder))}
                  </Table.Td>
                  <Table.Td>
                    {getHighlightedText(hasValue(camera?.tasks))} Tasks
                  </Table.Td>
                  <Table.Td>
                    <Badge text={camera?.status} variant={camera?.status} />
                  </Table.Td>
                  <Table.Td>
                    {changingStatus && camera?.id === selItem?.id ? (
                      <div className="flex items-center justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <FaRegCircleXmark
                          className="cursor-pointer text-xl text-gray-700 hover:text-gray-500 transition-all duration-300"
                          onClick={() => {
                            setSelItem(camera);
                            changeStatusHandler("Inactive", camera);
                          }}
                        />
                        <FaRegCheckCircle
                          className="cursor-pointer text-xl text-gray-700 hover:text-gray-500 transition-all duration-300"
                          onClick={() => {
                            setSelItem(camera);
                            changeStatusHandler("Active", camera);
                          }}
                        />
                      </div>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Body>
          </Table>
          <div className="flex justify-end items-center bg-white w-full py-3 px-4 gap-4">
            <div className=" min-w-[80px]">
              <Select
                withCloseBtn={false}
                disableBorder={true}
                options={[
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
                ]}
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
        </div>
      </div>
    </section>
  );
}
