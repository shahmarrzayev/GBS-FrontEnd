import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FreeMode,
  Navigation,
  Thumbs,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./HomeProject.scss";
import { getProjects } from "../../../api";
import { useApi } from "../../../hooks/useApi";
import DataState from "../../../components/dataState/DataState";

const HomeProject = ({ content }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { data: projects, loading, error } = useApi(
    (options) => getProjects({}, options),
    []
  );

  return (
    <section id="homeProject">
      <div className="container">
        <div className="row">
          <div className="col-7">
            <div className="sectionHeader">
              <h2>{content?.projectSectionTitle}</h2>
            </div>
          </div>
        </div>
        <DataState loading={loading} error={error} isEmpty={!projects?.length}>
        <Swiper
         slidesPerView={1}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="mySwiperProject"
        >
          {projects?.map((item) => (
            <SwiperSlide key={item.id} className="mainSwiper">
              <div className="sliderImage">
                <img src={item?.image} alt={item?.title} className="mainImage" />

                  <div className="overlay"></div>
              </div>
                <div className="sliderContent">
                  <h3>{item?.title}</h3>
                  <p>{item?.description}</p>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={3000}
          modules={[Autoplay, FreeMode, Navigation, Thumbs]}
          className="mt-4 thumbsSwiperProject"
        >
          {projects?.map((item) => (
            <SwiperSlide key={item.id} className="cursor-pointer">
              <div className="sliderImage">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl border"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </DataState>
      </div>
    </section>
  );
};

export default HomeProject;
