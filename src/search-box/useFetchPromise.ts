import { useRef, useState } from "react";
import debaounce from "lodash/debounce";

export const useFetchPromise = (debounceWait: number) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const abortControler: any = useRef(null);

  const fetchData = debaounce(
    async (
      query: string,
      transformData: (data: any) => any,
      promise: (query: string, signal: any) => Promise<any>,
      autoComplete: boolean
    ) => {
      try {
        if (!autoComplete) {
          return;
        }
        if (abortControler.current) {
          abortControler.current.abort();
        }
        abortControler.current = new AbortController();
        const signal = abortControler.current.signal;

        console.log("signal", signal);
        const response = await promise(query, signal);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setData(transformData(data));
        console.log("data", data);
        return [];
      } catch (error: any) {
        if (!abortControler.current.signal.aborted) {
          setError(error);
          console.log(error);
        }
      }
    },
    debounceWait
  );

  return { fetchData, data, setData, error, setError };
};
