import Checkbox from "@/components/Checkbox/Checkbox";
import Table from "@/components/Table/Table";
import React from "react";

export const CameraTableHeads = () => {
  return (
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
  );
};
