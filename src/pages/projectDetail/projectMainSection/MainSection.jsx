import React, { useEffect, useState } from 'react'
import './MainSection.scss'

const MainSection = ({ data }) => {
  const [activeImage, setActiveImage] = useState(data?.image);

  useEffect(()=>{
      setActiveImage(data?.image)
  },[data])

  if (!data) {
    return (
      <section id='mainSection'>
        <div className="container">
          <h2>Project not found</h2>
        </div>
      </section>
    )
  }

  return (
    <section id='mainSection'>
      <div className="bannerImage">
        <div className="sliderImage">
                  <img src={activeImage} alt={data?.title} className="mainImage" />

                  <div className="sliderOtherImages">
                      <div
                        className={`otherImage ${
                          data?.image === activeImage ? "active" : ""
                        }`}
                        onClick={() => setActiveImage(data?.image)}
                      >
                        <img src={data?.image} alt={data?.title} />
                      </div>
                    {data?.images?.map((img, index) => (
                      <div
                        key={index}
                        className={`otherImage ${
                          img === activeImage ? "active" : ""
                        }`}
                        onClick={() => setActiveImage(img)}
                      >
                        <img src={img} alt={data?.title} />
                      </div>
                    ))}
                  </div>
                  <div className="overlay">
                  </div>
                  <div className="sliderContent">
                    <h3>{data?.title}</h3>
                    <p>{data?.description}</p>
                  </div>
                </div>
      </div>
     <div className="container mt-5">
       <div className="projectDescription">
        <h3>
          {data?.title}
        </h3>
        <p>
          {data?.description}
        </p>
      </div>
     </div>
    </section>
  )
}

export default MainSection
