import React from "react";
import "./DetailDescription.scss";

const DetailDescription = ({ data }) => {
  if (!data?.longDescription && !data?.specifications?.length) return null;

  return (
    <section id="detailDescription">
      <div className="container">
        <div className="descriptionSectionHeader">
            <h3>Detailed Description — {data?.title}</h3>
            <p>{data?.longDescription}</p>
        </div>
        {data?.specifications?.length > 0 && (
        <div className="descriptionTable">
          <div className="tableHeader">
            <span>Parameters</span>
            <span>Value</span>
          </div>
          {data.specifications.map((spec, index) => (
          <div className="tableBody" key={index}>
            <p>
              <span>{index + 1}</span> <span>{spec.parameter}</span>
            </p>
            <span>{spec.value}</span>
          </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default DetailDescription;
