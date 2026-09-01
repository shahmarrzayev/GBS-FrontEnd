import React from "react";
import "./DataState.scss";

/**
 * Renders the loading and error states around an API-backed section so each
 * section does not reinvent them. Children render once data has arrived.
 */
const DataState = ({ loading, error, isEmpty = false, emptyText, children }) => {
  if (loading) {
    return (
      <div className="dataState">
        <span className="spinner" aria-label="Loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dataState dataStateError">
        <p>Content could not be loaded. Please try again later.</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="dataState">
        <p>{emptyText || "Nothing found"}</p>
      </div>
    );
  }

  return children;
};

export default DataState;
