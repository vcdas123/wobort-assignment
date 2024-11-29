"use client";
import { grade } from "@/store/interfaces/cameraInterface";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

type UniqueByKey<T> = (array: T[], key: keyof T) => T[];

export const makeOptions = <T extends Record<string, any>>(
  data: T[] | undefined,
  label: keyof T | Array<keyof T>,
  value: keyof T
): Array<{ label: string; value: string }> => {
  return (
    data?.map((el: T) => ({
      label: Array.isArray(label)
        ? label.map(key => String(el[key] ?? "")).join(" ")
        : String(el[label] ?? ""),
      value: String(el[value] ?? ""),
    })) ?? []
  );
};

export const getUniqueArrayByKey: UniqueByKey<any> = (array, key) => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

export const hasValue: (val: string) => string = val => (val ? val : "N/A");

export const renderProgress = (grade: grade) => {
  return (
    <div style={{ width: 30, height: 30 }}>
      {grade === "A" ? (
        <CircularProgressbar
          value={66}
          text={grade}
          styles={buildStyles({
            textSize: "50px",
            pathColor: "#2f9e44",
            textColor: "black",
          })}
        />
      ) : (
        <CircularProgressbar
          value={66}
          text={grade}
          styles={buildStyles({
            textSize: "50px",
            pathColor: "#ff922b",
            textColor: "black",
          })}
        />
      )}
    </div>
  );
};
