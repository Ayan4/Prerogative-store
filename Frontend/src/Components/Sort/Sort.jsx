import "./Sort.scss";
import { FiChevronDown } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useProduct } from "../../context/product-context";
import { Link } from "react-router-dom";

function Sort() {
  const node = useRef(null);
  const { dispatch } = useProduct();
  const [open, setOpen] = useState(false);
  const [defaultTitle, setDefaultTitle] = useState("Recommended");

  useEffect(() => {
    const handleDropdown = e => {
      if (!node.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDropdown);
    return () => document.removeEventListener("mousedown", handleDropdown);
  });

  const sortItemHandler = e => {
    const title = e.target.innerText;
    setDefaultTitle(title);
    setOpen(!open);
    dispatch({ type: "sort", payload: title });
  };

  return (
    <div onClick={() => setOpen(!open)} ref={node} className="sort-wrapper">
      <div className="sort">
        <FiChevronDown className="sort-down-chevron"></FiChevronDown>
        <p className="dd-placeholder">
          Sort By <span className="seperator">:</span>{" "}
        </p>
        <p className="dd-title">{defaultTitle}</p>
      </div>
      {open && (
        <ul className="dd-list">
          <Link to={{ search: "?sort=low2high" }}>
            <li
              onClick={sortItemHandler}
              className="dd-list-item list-item-border"
            >
              Low To High
            </li>
          </Link>
          <li onClick={sortItemHandler} className="dd-list-item">
            High To Low
          </li>
        </ul>
      )}
    </div>
  );
}

export default Sort;
