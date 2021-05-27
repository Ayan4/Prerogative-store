import { BiFilterAlt } from "react-icons/bi";
import "./Filter.scss";
import { BiCheck } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import { useProduct } from "../../context/product-context";

function Filter() {
  const node = useRef(null);
  const [open, setOpen] = useState(false);
  const { dispatch, showFastDelivery, showOutOfStock } = useProduct();

  useEffect(() => {
    const handleFilter = e => {
      if (!node.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleFilter);
    return () => document.removeEventListener("mousedown", handleFilter);
  });

  return (
    <div onClick={() => setOpen(!open)} ref={node} className="filter-wrapper">
      <div className="filter">
        <BiFilterAlt className="filter-icon"></BiFilterAlt>
        <p>Filter</p>
      </div>

      {open && (
        <ul className="filter-list">
          <li
            onClick={() => {
              dispatch({ type: "FAST_DELIVERY" });
            }}
            className="filter-list-item list-item-border"
          >
            Fast delivery
            <div className="filter-checkbox">
              {showFastDelivery && <BiCheck className="filter-check"></BiCheck>}
            </div>
          </li>

          <li
            onClick={() => {
              dispatch({ type: "OUT_OF_STOCK" });
            }}
            className="filter-list-item"
          >
            Show Out Of Stock
            <div className="filter-checkbox">
              {showOutOfStock && <BiCheck className="filter-check"></BiCheck>}
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Filter;
