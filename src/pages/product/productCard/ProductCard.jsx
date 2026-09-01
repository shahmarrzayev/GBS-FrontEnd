import React from "react";
import { NavLink } from "react-router-dom";
import "./ProductCard.scss";
import DataState from "../../../components/dataState/DataState";

const ProductCard = ({ data, loading, error }) => {
  return (
    <section id="productCard">
      <div className="container py-3">
        <DataState
          loading={loading}
          error={error}
          isEmpty={!data?.length}
          emptyText="Heç nə tapılmadı"
        >
          <div className="row">
            {data?.slice(0, 12).map((item) => (
              <div className="col-lg-4" key={item.id}>
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
              </div>
            ))}
          </div>
        </DataState>
      </div>
    </section>
  );
};

export default ProductCard;
