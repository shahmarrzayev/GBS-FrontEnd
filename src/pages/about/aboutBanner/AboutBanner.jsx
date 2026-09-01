import React from "react";
import { NavLink } from "react-router-dom";
import "./AboutBanner.scss"
import SucsessGrayIcon from "../../../assets/icons/SucsessGrayIcon";

const AboutBanner = ({ content }) => {
  return (
    <>
    <section id="aboutBanner" className="bgGray">
      <div className="container p-0">
       <div className="row align-items-center">
         <div className="col-lg-6">
          <div className="bannerContents">
            <div className="contentHead">
              <h2>{content?.heroTitle}</h2>
              <p>
                {content?.heroDescription}
              </p>
              <NavLink to="/contact">
                <span className="icon">→</span>
                <span className="text">Now Contact Us</span>
              </NavLink>
            </div>
            <div className="contentBody">
                <div className="bodyDiv">
                    {content?.stats?.map((stat, index) => (
                    <div className="txt" key={index}>
                        <h4>{stat.value}</h4>
                        <span>{stat.label}</span>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
            <div className="bannerImage">
                <img src={content?.heroImage} alt={content?.heroTitle} />
            </div>
        </div>
       </div>
      </div>
    </section>
    {content?.taglineImage && (
    <section>
        <div className="container p-0">
        <div className="aboutTeamImage" style={{backgroundImage:`url(${content.taglineImage})`}}>
                <h4>{content?.tagline}</h4>
                <div className="overlay"></div>
            </div>
        </div>
    </section>
    )}
      <section id="aboutBanner" >
      <div className="container p-0">
       <div className="row flex-row-reverse align-items-center">
         <div className="col-lg-7">
          <div className="bannerContents">
            <div className="contentHead">
              <h2>{content?.secondBlockTitle}</h2>
              <p>
                {content?.secondBlockDescription}
              </p>

            </div>
            <div className="contentBody">
               <div className="bodyLists">
                <ul>
                    {content?.bulletServices?.map((service) => (
                    <li key={service.id}><SucsessGrayIcon/> {service.text}</li>
                    ))}
                </ul>
               </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
            <div className="bannerImage">
                <img src={content?.heroImage} alt={content?.secondBlockTitle} />
            </div>
        </div>
       </div>
      </div>
    </section>
    </>
  );
};

export default AboutBanner;
