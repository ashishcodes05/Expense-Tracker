import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

export function useFilter(dataList, callback) {
  const [query, setQuery] = useLocalStorage("query", "");
  const filteredData = dataList.filter((data) => {
    return callback(data).toLowerCase().includes(query.toLowerCase());
  });
  return [filteredData, setQuery];
}
