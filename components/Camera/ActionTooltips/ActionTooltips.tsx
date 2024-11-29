import React, { CSSProperties } from "react";
import { Tooltip } from "react-tooltip";
const style: CSSProperties = { zIndex: 99 };

const ActionTooltips = () => {
  return (
    <>
      <Tooltip anchorSelect="#del-icon" content="Delete" style={style} />
      <Tooltip anchorSelect="#active-icon" content="Active" style={style} />
      <Tooltip anchorSelect="#inactive-icon" content="Inactive" style={style} />
    </>
  );
};

export default ActionTooltips;
