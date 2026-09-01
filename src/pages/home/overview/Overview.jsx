import React, { useEffect, useState } from "react";
import Fancybox from "../../../components/fancybox/Fancybox";
import playIcon from "../../../assets/icons/playIcon.png";
import "./Overview.scss";
import { NavLink } from "react-router-dom";
import { getOverviews } from "../../../api";
import { useApi } from "../../../hooks/useApi";
import DataState from "../../../components/dataState/DataState";

const Overview = ({ content }) => {
  const { data: overviews, loading, error } = useApi(
    (options) => getOverviews(options),
    []
  );
  const [openId, setOpenId] = useState(null);

  // Open the first accordion item as soon as the data arrives.
  useEffect(() => {
    setOpenId(overviews?.[0]?.id ?? null);
  }, [overviews]);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const activeItem = overviews?.find((item) => item.id === openId);

  return (
    <section id="overview">
      <div className="container">
         <div className="row">
          <div className="col-7">
            <div className="sectionHeader">
          <h2>{content?.overviewTitle}</h2>
          <p>
            {content?.overviewDescription}
          </p>
        </div>
          </div>
        </div>
        <DataState
          loading={loading}
          error={error}
          isEmpty={!overviews?.length}
        >
        <div className="row">
          <div className="col-lg-5">
            <div className="accardionButtons">
              {overviews?.map((item) => (
                <div
                  key={item.id}
                  className={`accordionItem ${
                    openId === item.id ? "active" : ""
                  }`}
                  onClick={() => toggleAccordion(item.id)}
                >
                  <div
                    className="accardionHeader"

                  >
                    <span>
                      {item.title}
                    </span>
                  </div>

                  {openId === item.id && (
                    <div className="accardionContent">
                      <div>{item.description}</div>
                      <div className="accardionImages">
                        {item.images?.map((img, index) => (
                          <img key={index} src={img} alt="" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-7">
            <div className="acardionVideo">
                <div className="videoContent">
                    <div className="texts">
                        <h3>{activeItem?.title}</h3>
                        <p>{activeItem?.description}</p>
                    </div>
                     <NavLink className="viewButton"  to="/contact">
                              <span className="icon">→</span>
                              <span className="text">View</span>
                            </NavLink>
                </div>
              {activeItem?.videoSrc && (
              <div className="playIcon">
                <Fancybox>
                  <a
                    href={activeItem.videoSrc}
                    data-fancybox="gallery"
                    className="videoImg imageSize-700"
                  >
                    <div className="icon">
                        <img src={playIcon} alt="" />
                    </div>
                  </a>
                </Fancybox>
              </div>
              )}
            </div>
          </div>
        </div>
        </DataState>
      </div>
    </section>
  );
};

export default Overview;
