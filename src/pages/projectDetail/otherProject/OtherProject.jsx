import React from "react";
import "./OtherProject.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import projecrImage from "../../../assets/project/project1.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import { NavLink } from "react-router-dom";
const OtherProject = ({ data }) => {
  return (
    <section id="otherProject">
      {data?.length > 0 && (
      <div className="container-fluid p-0">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          // pagination={{
          //   clickable: true,
          // }}
          slidesOffsetBefore={40}
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
              slidesPerView: 2.15,
              spaceBetween: 10,
            },
          }}
          modules={[]}
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="otherProjectCard"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                 <div className="overlay"></div>
                <div className="cardBox">
                  <div className="cardContents">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="cardButtons">
                    <p>{item.description}</p>

                    <NavLink to={`/project/${item.slug}`}>
                      <span className="icon">→</span>
                      <span className="text">About Project</span>
                    </NavLink>
                  </div>
                </div>
               
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      )}
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-lg-7 col-sm-12">
            <div className="bgGrayCard">
              <div className="contents">
                <h2>Looking to partner with us?</h2>
                <NavLink to={`/contact`}>
                      <span className="icon">→</span>
                      <span className="text">Now Contact Us</span>
                    </NavLink>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="projectFooterCard" style={{ backgroundImage: `url(${projecrImage})` }} >

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherProject;
