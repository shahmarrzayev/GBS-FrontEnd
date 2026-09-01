import React from "react";
import "./ProjectCard.scss";
import { NavLink } from "react-router-dom";
import DataState from "../../../components/dataState/DataState";

const ProjectCard = ({ content, data, loading, error }) => {
  return (
    <section id="projectCard">
      <div className="container">
        <div className="row">
            <h2 className="pageTitle">{content?.title}</h2>
        </div>
        <DataState loading={loading} error={error} isEmpty={!data?.length}>
        <div className="row">
          {data?.map((item) => (
            <div key={item.id}  className="col-lg-6 g-3">
              <div
                className="prCard"
                style={{ backgroundImage: `url(${item.image})` }}
              >
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
             <div className="overlay"></div>
              </div>
            </div>
          ))}
        </div>
        </DataState>
      </div>
    </section>
  );
};

export default ProjectCard;
