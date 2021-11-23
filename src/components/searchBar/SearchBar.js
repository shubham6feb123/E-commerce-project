import React, { useState } from "react";

//components
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function SearchBar() {
  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const { text } = search;

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    // console.log("key------> ", e);
    if (e.key === "Enter") {
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: searchText },
      });

      history.push(`/search?${text}`);
    }
  };

  return (
    <div className="header__searchbar">
      <input
        type="search"
        name="search"
        id=""
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleSubmit}
        placeholder="Search"
      />
      <SearchOutlined />
    </div>
  );
}

export default SearchBar;
