import React, { ReactNode } from "react";

interface TitleIn {
  rightSection: ReactNode;
}

const Title = ({ rightSection }: TitleIn) => {
  return (
    <div className="flex flex-col xl:gap-0 gap-3 xl:flex-row justify-between xl:items-center">
      <div className="flex flex-col gap-[12px]">
        <h1 className="text-xl text-accent font-medium">Cameras</h1>
        <p className="text-sm text-accent-secondary">
          Manage your cameras here.
        </p>
      </div>
      {rightSection}
    </div>
  );
};

export default Title;
