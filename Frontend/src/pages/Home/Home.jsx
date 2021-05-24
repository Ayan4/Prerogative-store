import { Link } from "react-router-dom";
import ties from "../../assets/tie.jpg";
import belts from "../../assets/belt.jpg";
import shoes from "../../assets/brown-shoe.jpg";
import watches from "../../assets/watch.jpg";
import heroImage from "../../assets/home-image-group.jpg";
import { BsChevronRight } from "react-icons/bs";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.scss";
import { useProduct } from "../../context/product-context";

function Home({ clickHandler }) {
  const { products } = useProduct();

  // console.log(products);

  return (
    <div className="home">
      <div className="banner-wrapper">
        <Navbar homePage />
        <div className="hero-container">
          <div className="hero-text">
            <h1 className="hero-heading">
              Wear what we are proud of, Best linen collection in the world
            </h1>
            <p className="hero-sub-heading">
              Made of the Finest Natural Cotton with a Cutting Edge,
              Contemporary Design
            </p>

            {/* <Link className="home-cta-link" to="products"> */}
            <Link to="/products" onClick={clickHandler} className="cta">
              <p className="btn-text">Explore Collection</p>
              <BsChevronRight className="right-arrow"></BsChevronRight>
            </Link>
            {/* </Link> */}
          </div>

          <div className="hero-images-box">
            <img className="hero-image" src={heroImage} alt="" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-container">
        <div className="categories-wrapper">
          <p className="categories-heading">Categories</p>

          <div className="category-slider">
            <Link to="/products" className="category-box">
              <img src={ties} alt="" />
              <p className="category-box-label">Ties</p>
            </Link>
            <Link to="/products" className="category-box">
              <img src={belts} alt="" />
              <p className="category-box-label">Belts</p>
            </Link>
            <Link
              to="/products"
              className="category-box category-box-second-last"
            >
              <img src={shoes} alt="" />
              <p className="category-box-label">Shoes</p>
            </Link>
            <Link to="/products" className="category-box category-box-last">
              <img src={watches} alt="" />
              <p className="category-box-label">Watches</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured */}

      <div className="featured-container">
        <div className="featured-wrapper">
          <p className="featured-heading">Featured</p>

          <div className="featured-slider">
            {products.slice(0, 4).map(item => {
              return (
                <Link
                  key={item._id}
                  to={`/product-detail/${item._id}`}
                  className="featured-card"
                >
                  <img src={item.image} alt="" />
                  <div className="featured-card-info">
                    <p className="featured-card-title"> {item.name} </p>
                    <p className="featured-card-price">${item.price} </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
