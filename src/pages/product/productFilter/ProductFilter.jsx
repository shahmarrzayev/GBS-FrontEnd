import React from "react";
import "./ProductFilter.scss";
import fallbackBanner from "../../../assets/productBanner.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
const ProductFilter = ({
  content = null,
  categories = [],
  selectedCategoryId = null,
  selectedSubcategoryId = null,
  onCategoryChange = () => {},
  onSubcategoryChange = () => {},
}) => {
  const selectedCategory =
    categories.find((cat) => cat.id === selectedCategoryId) || null;

  return (
    <section id="productFilter">
      <div
        className="productBanner"
        style={{ backgroundImage: `url(${content?.bannerImage || fallbackBanner})` }}
      >
        <div className="overlay">
          <h1>{content?.title}</h1>
        </div>
      </div>
      <div className="container">
        <div className="filterBtns">
          <h3>Categorys</h3>

          <Swiper spaceBetween={10} slidesPerView={"auto"}>
            <SwiperSlide
              onClick={() => {
                onCategoryChange(null);
                onSubcategoryChange(null);
              }}
              className={`filterListBtn ${selectedCategoryId === null ? "active" : ""}`}
              style={{ width: "auto" }}
            >
              All
            </SwiperSlide>
            {categories.map((cat, i) => (
              <SwiperSlide
                onClick={() => {
                  onCategoryChange(cat.id);
                  onSubcategoryChange(null);
                }}
                className={`filterListBtn ${selectedCategoryId === cat.id ? "active" : ""}`}
                key={i}
                style={{ width: "auto" }}
              >
                {cat.name}
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <ul>
            <li>All</li>
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  onSubcategoryChange(null);
                }}
                className={selectedCategoryId === category.id ? "active" : ""}
              >
                {category.name}
              </li>
            ))}
          </ul> */}
        </div>
        {selectedCategory && (
          <div className="filterBtns">
            <h3>Subcategories</h3>
            <Swiper spaceBetween={10} slidesPerView={"auto"}>
            <SwiperSlide
              onClick={() => onSubcategoryChange(null)}
              className={`filterListBtn ${selectedSubcategoryId === null ? "active" : ""}`}
              style={{ width: "auto" }}
            >
              All
            </SwiperSlide>
            {selectedCategory?.subcategory?.map((sub, i) => (
              <SwiperSlide
               onClick={() => onSubcategoryChange(sub.id)}

                className={`filterListBtn ${selectedSubcategoryId === sub.id ? "active" : ""}`}
                key={i}
                style={{ width: "auto" }}
              >
                {sub.name}
              </SwiperSlide>
            ))}
          </Swiper>
          
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductFilter;
