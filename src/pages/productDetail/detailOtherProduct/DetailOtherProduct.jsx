import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { NavLink } from "react-router-dom";
import "./DetailOtherProduct.scss"
const DetailOtherProduct = ({ data }) => {
  if (!data?.length) return null;

  return (
    <section id="otherProducts">
      <div className="container my-5">
        <button className="navigationBtn prevBtn">←</button>
          <button className="navigationBtn nextBtn">→</button>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          // pagination={{
          //   clickable: true,
          // }}
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
          className="otherProductsSwiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <NavLink to={`/product/${item.slug}`}>
                <div className="productsCard">
                  <div className="cardImage">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cardContent">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DetailOtherProduct;
