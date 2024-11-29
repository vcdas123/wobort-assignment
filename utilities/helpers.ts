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
