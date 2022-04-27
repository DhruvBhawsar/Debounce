import { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setSearch] = useState([]);

  const debounceing = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = (event) => {
    const { value } = event.target;
    axios
      .get(`https://demo.dataverse.org/api/search?q=${value}`)
      .then((res) => {
        setSearch(res.data.data.items);
        console.log(res.data.data.items);
        // console.log(res.data.data.items);
      });
  };

  // useCallback provides the memoized callback
  const newOptimise = useCallback(debounceing(handleChange), []);

  return (
    <div className="App">
      <input
        type="text"
        className="searchBox"
        onChange={newOptimise}
        name="searchBox"
        placeholder="Enter some to search"
      />
      {search?.length > 0 && (
        <div className={"fetchdatas"}>
          {search?.map((el, i) => {
            <div key={i} className={"data"}>
              <span>{el.name}</span>
            </div>;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
