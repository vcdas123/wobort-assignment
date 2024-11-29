"use client";

import React, { FC, InputHTMLAttributes, useState } from "react";
import classNames from "classnames";
import { IoCheckmark } from "react-icons/io5";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  height?: string;
  width?: string;
  iconSize?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  className,
  disabled,
  height = "1.3rem",
  width = "1.3rem",
  iconSize = "1.25rem",
  checked,
  onChange,
  ...props
}) => {
  const [internalChecked, setInternalChecked] = useState(false);

  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalChecked(e.target.checked);
    }
  };

  return (
    <label
      className={classNames(
        "flex items-center justify-center border-2 rounded-md cursor-pointer transition-colors",
        isChecked && !disabled
          ? "bg-blue-600 border-blue-600"
          : "border-gray-300",
        disabled ? "bg-gray-200 border-gray-300 cursor-not-allowed" : "",
        className
      )}
      style={{ height, width }}
    >
      <input
        type="checkbox"
        {...props}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only peer"
      />
      {!disabled && isChecked && (
        <IoCheckmark
          className="text-white transition-transform duration-200 ease-in-out transform scale-100"
          style={{ fontSize: iconSize }}
        />
      )}
    </label>
  );
};

export default Checkbox;
