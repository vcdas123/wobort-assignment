"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: Option[];
  value: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange: (value: string) => void;
  width?: string;
  disableBorder?: boolean;
  withCloseBtn?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  placeholder = "Select an option",
  leftIcon,
  rightIcon = <IoIosArrowDown className="text-lg text-gray-700" />,
  onChange,
  width = "100%",
  disableBorder = false,
  withCloseBtn = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Adjust dropdown position based on available space
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 200 && spaceAbove > 200) {
        setPosition("top"); // Open above if not enough space below
      } else {
        setPosition("bottom"); // Default to open below
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectChange = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    onChange("");
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={selectRef} className="relative inline-block" style={{ width }}>
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className={`flex items-center cursor-pointer px-4 py-2 rounded-md w-full text-sm relative ${
          disableBorder ? "" : "border border-gray-300"
        }`}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}

        {!selectedOption ? (
          <span className="text-gray-500">{placeholder}</span>
        ) : (
          <>
            {selectedOption?.icon && (
              <span className="mr-2">{selectedOption.icon}</span>
            )}
            <span className="flex-grow">{selectedOption?.label}</span>
          </>
        )}

        {selectedOption && withCloseBtn ? (
          <span className="ml-2 cursor-pointer" onClick={handleClearSelection}>
            <IoMdClose className="text-lg text-gray-700" />
          </span>
        ) : (
          <span className="ml-2 absolute right-4">{rightIcon}</span>
        )}
      </div>

      {isOpen && (
        <ul
          className={`absolute left-0 w-full border border-gray-300 mt-1 bg-white rounded shadow-lg max-h-60 overflow-y-auto z-50 ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-1"
          }`}
        >
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleSelectChange(option.value)}
              className={`flex text-sm items-center text-gray-700 px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                option.value === value ? "bg-[#e7f5ff]" : ""
              }`}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
