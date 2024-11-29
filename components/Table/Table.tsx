"use client";
import React, { FC, ReactNode, HTMLAttributes } from "react";
import classNames from "classnames";

interface TableComponentProps extends HTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
  maxHeight?: string;
}

const Table: FC<TableComponentProps> & {
  Head: typeof Head;
  Body: typeof Body;
  Tr: typeof Tr;
  Th: typeof Th;
  Td: typeof Td;
} = ({ children, className, maxHeight, ...props }) => {
  return (
    <div
      className={classNames("custom-table-container", className)}
      style={{
        maxHeight,
        overflowY: "auto",
        height: "100%",
      }}
    >
      <table {...props} className={classNames("custom-table", className)}>
        {children}
      </table>
    </div>
  );
};

const Head: FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <thead {...props} className={classNames("custom-table-head", className)}>
      {children}
    </thead>
  );
};

const Body: FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <tbody {...props} className={classNames("custom-table-body", className)}>
      {children}
    </tbody>
  );
};

const Tr: FC<HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <tr {...props} className={classNames("custom-table-row", className)}>
      {children}
    </tr>
  );
};

const Th: FC<HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <th {...props} className={classNames("custom-table-header", className)}>
      {children}
    </th>
  );
};

const Td: FC<HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td {...props} className={classNames("custom-table-cell", className)}>
      {children}
    </td>
  );
};

Table.Head = Head;
Table.Body = Body;
Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;

export default Table;
