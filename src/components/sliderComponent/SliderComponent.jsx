import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './SliderComponents.scss'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,Autoplay } from 'swiper/modules';
const SliderComponent = ({data,title}) => {
  if (!data?.length) return null

  return (
   <section id='sliderComponent'>
    
        
    <div className="container">
        {title && <div className="sectionHeader">
        <h2>{title}</h2>
    </div> }
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className} custom-bullet"></span>`;
        },
      }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination,Autoplay]}
        className="sliderComponentsSwiper"
      >
        {data.map((item)=>(

        <SwiperSlide key={item.id}>
            <img src={item.image} alt={item.name || ""} />
        </SwiperSlide>
        ))}

      </Swiper>
    </div>
   </section>
  )
}

export default SliderComponent