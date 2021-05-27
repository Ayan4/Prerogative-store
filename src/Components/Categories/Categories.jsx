import "./Categories.scss";
import { AiOutlineInsertRowLeft } from "react-icons/ai";
import { CgChevronRight } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useProduct } from "../../context/product-context";

function Categories() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const queryParam = useQuery().get("category");
  const { categories } = useProduct();

  return (
    <div className="categories">
      <div className="categories-heading-wrapper">
        <AiOutlineInsertRowLeft className="categories-icon"></AiOutlineInsertRowLeft>
        <h2 className="categories-heading">Categories</h2>
      </div>
      <div className="categories-list">
        <Link
          to="/products"
          className={
            !queryParam ? "categories-item category-active" : "categories-item"
          }
        >
          <p>All</p>
          <CgChevronRight
            className={
              !queryParam
                ? "categories-chevron-icon categories-chevron-icon-active"
                : "categories-chevron-icon"
            }
          />
        </Link>
        {categories.map(item => {
          return (
            <Link
              key={item._id}
              to={`?category=${item.category}`}
              className={
                queryParam === item.category
                  ? "categories-item category-active"
                  : "categories-item"
              }
            >
              <p>{item.category}</p>
              <CgChevronRight
                className={
                  queryParam === item.category
                    ? "categories-chevron-icon categories-chevron-icon-active"
                    : "categories-chevron-icon"
                }
              />
            </Link>
          );
        })}

        {/* <Link to="/products" className="categories-item category-active">
          <p>Suits</p>
          <CgChevronRight className="categories-chevron-icon categories-chevron-icon-active" />
        </Link>
        <Link to="/products" className="categories-item">
          <p>Shoes</p>
          <CgChevronRight className="categories-chevron-icon" />
        </Link>
        <Link to="/products" className="categories-item">
          <p>Ties</p>
          <CgChevronRight className="categories-chevron-icon" />
        </Link>
        <Link to="/products" className="categories-item">
          <p>Belts</p>
          <CgChevronRight className="categories-chevron-icon" />
        </Link> */}
      </div>
    </div>
  );
}

export default Categories;
