import React from "react";
import { SearchBox } from "./search-box";
import "./App.css";
import { ListBox } from "./search-box/list-box";

function App() {
  const transformData = (data: any) => data.results;

  const dataPromise = async (query: string, signal: any) =>
    await fetch(`https://swapi.dev/api/people/?search=${query}`, { signal });

  return (
    <div className="wrapper">
      <SearchBox
        id="personName"
        name="personName"
        label="Enter Person name"
        placeholder="Enter your fav star war char"
        autoComplete={true}
        maxItems={5}
        styles={{
          label: "label",
          input: "input",
        }}
        debounceWait={1000}
        listBox={(items: any[], activeIndex: number) => (
          <ListBox items={items} activeIndex={activeIndex} />
        )}
        noItemsMessage={() => <div>Something went wrong</div>}
        transformData={transformData}
        promise={dataPromise}
      />
    </div>
  );
}

export default App;
