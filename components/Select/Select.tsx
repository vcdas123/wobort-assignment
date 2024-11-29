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
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  placeholder = "Select an option",
  leftIcon,
  rightIcon = <IoIosArrowDown className="text-lg text-gray-700" />,
  onChange,
  width = "100%",
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
        className="flex items-center cursor-pointer px-4 py-2 rounded-md border border-gray-300 w-full text-sm relative focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}

        {!selectedOption ? (
          <span className="text-gray-700">{placeholder}</span>
        ) : (
          <>
            {selectedOption?.icon && (
              <span className="mr-2">{selectedOption.icon}</span>
            )}
            <span className="flex-grow">{selectedOption?.label}</span>
          </>
        )}

        {selectedOption ? (
          <span className="ml-2 cursor-pointer" onClick={handleClearSelection}>
            <IoMdClose className="text-lg text-gray-700" />
          </span>
        ) : (
          <span className="ml-2 absolute right-4">{rightIcon}</span>
        )}
      </div>

      {isOpen && (
        <ul className="absolute top-full left-0 w-full border border-gray-300 mt-1 bg-white rounded shadow-lg max-h-60 overflow-y-auto z-50">
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleSelectChange(option.value)}
              className={`flex items-center text-gray-700 px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                option.value === value ? "bg-blue-200" : ""
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
