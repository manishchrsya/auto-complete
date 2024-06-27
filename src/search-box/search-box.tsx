/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { useFetchPromise } from "./useFetchPromise";

interface IProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete: boolean;
  maxItems: number;
  styles: any;
  debounceWait: number;
  listBox: any;
  noItemsMessage: any;
  transformData: (data: any) => any;
  promise: (query: string, signal: any) => Promise<any>;
}

export const SearchBox: FC<IProps> = ({
  autoComplete,
  debounceWait,
  id,
  label,
  listBox,
  maxItems,
  name,
  noItemsMessage,
  placeholder,
  styles,
  transformData,
  promise,
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<any>(null);
  const { fetchData, data, setData, setError } = useFetchPromise(debounceWait);

  useEffect(() => {
    if (!query) {
      setData([]);
      setError(null);
      return;
    }
    fetchData(query, transformData, promise, autoComplete);
  }, [query]);

  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleKeyUp = (event: any) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) {
      // user enter
      if (activeIndex === null) return;
      //   console.log(data[activeIndex].name);
      setQuery((data as any)[activeIndex].name);
      setData([]);
      setActiveIndex(null);
      //   setIsAutoComplete(false);
      return;
    }
    // setIsAutoComplete(true);
    if (!data || data.length === 0) return;
    if (keyCode === 40) {
      // move down
      if (activeIndex === null || activeIndex === data.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prevIndex: number) => prevIndex + 1);
      }
    } else if (keyCode === 38) {
      // move up
      if (activeIndex === 0) setActiveIndex(data.length - 1);
      else setActiveIndex((prevIndex: number) => prevIndex - 1);
    }
  };

  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <br />
      <input
        type="text"
        name={name}
        className={styles.input}
        id={id}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        autoComplete="off"
        onKeyUp={handleKeyUp}
      />
      {data && data.length > 0 && listBox(data, activeIndex)}
    </>
  );
};
