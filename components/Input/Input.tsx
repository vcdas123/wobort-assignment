import React, { InputHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  description,
  error,
  leftSection,
  rightSection,
  className,
  ...props
}) => {
  return (
    <div className="input-container">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {description && (
        <p className="text-sm text-gray-500 mb-2">{description}</p>
      )}
      <div
        className={classNames(
          "relative flex items-center rounded-[6px] bg-gray-100 ",
          error ? "border-red-500 focus-within:ring-red-500" : "",
          className
        )}
      >
        {leftSection && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            {leftSection}
          </div>
        )}
        <input
          {...props}
          className={classNames(
            "w-full py-1 pl-4 pr-4 rounded-[6px] bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none  focus:bg-white",
            leftSection ? "pl-10" : "",
            rightSection ? "pr-10" : "",
            error && "border-red-500"
          )}
        />
        {rightSection && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {rightSection}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
