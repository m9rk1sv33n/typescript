import { useState, useEffect } from "react";
import "./App.css";
import useDebounce from "./hooks/useDebounce";

function App() {
  interface Show {
    show: {
      url: string;
      name: string;
    };
  }

  const [searchData, setSearchData] = useState<Show[]>([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(-1);
  const debouncedSearch = useDebounce(search, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (selectedItem < searchData.length) {
      if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
        setSelectedItem((prev) => prev + 1);
      } else if (e.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
      } else if (e.key === "Enter" && selectedItem >= 0) {
        window.open(searchData[selectedItem].show.url);
      }
    } else {
      setSelectedItem(-1);
    }
  };

  useEffect(() => {
    if (debouncedSearch !== null) {
      fetch(`http://api.tvmaze.com/search/shows?q=${debouncedSearch}`)
        .then((res) => res.json())
        .then((data) => setSearchData(data));
    } else {
      setSearchData([]);
    }
  }, [debouncedSearch]);

  return (
    <>
      <h1>TypeScript TypeAhead</h1>
      <input
        type="search"
        placeholder="A Teacher"
        autoComplete="off"
        onChange={handleChange}
        value={search}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleClose}>X</button>
      <div className="search-results">
        <ul>
          {searchData.map((data, index) => {
            return (
              <li key={index} style={{ listStyleType: "none" }}>
                {index}
                {selectedItem}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={data.show.url}
                  className={
                    selectedItem === index
                      ? "selected-item active"
                      : "selected-item"
                  }
                >
                  {data.show.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
