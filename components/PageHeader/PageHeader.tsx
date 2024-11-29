import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import Title from "../Title/Title";
import Input from "../Input/Input";

const PageHeader = () => {
  return (
    <Title
      rightSection={
        <Input
          rightSection={<IoSearchOutline className="text-lg text-gray-600" />}
          placeholder="search"
        />
      }
    />
  );
};

export default PageHeader;
