import React from "react";
import "./OurProducts.scss";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { NavLink } from "react-router-dom";
import { getProducts } from "../../../api";
import { useApi } from "../../../hooks/useApi";
import DataState from "../../../components/dataState/DataState";

const OurProducts = ({ content }) => {
  const { data: products, loading, error } = useApi(
    (options) => getProducts({ limit: 6 }, options),
    []
  );

  return (
    <section id="ourProducts">
      <div className="container">
        <div className="row">
          <div className="col-7">
            <div className="sectionHeader">
              <h2>{content?.productsSectionTitle}</h2>
              <p>
                {content?.productsSectionDescription}
              </p>
            </div>
          </div>
        </div>
         <button className="navigationBtn prevBtn">←</button>
          <button className="navigationBtn nextBtn">→</button>
        <DataState loading={loading} error={error} isEmpty={!products?.length}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
                   navigation={{
            nextEl: ".nextBtn",
            prevEl: ".prevBtn",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          modules={[Navigation]}
          className="productsSwiper"
          id="slider_tab"
        >
          {products?.map((item) => (
            <SwiperSlide key={item.id}>
              <NavLink to={`/product/${item?.slug}`}>
                <div className="productsCard">
                  <div className="cardImage">
                    <img src={item?.image} alt={item?.title} />
                  </div>
                  <div className="cardContent">
                    <h4>{item?.title}</h4>
                    <p>{item?.description}</p>
                  </div>
                </div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
        </DataState>
      </div>
    </section>
  );
};

export default OurProducts;
