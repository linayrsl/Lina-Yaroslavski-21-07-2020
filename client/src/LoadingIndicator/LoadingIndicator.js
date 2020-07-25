import React from "react";
import "./LoadingIndicator.scss";
import PropTypes from "prop-types";

function LoadingIndicator(props) {
  return (
    <div className={`loadingIndicator ${props.className || ""}`}>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

LoadingIndicator.propTypes = {
  className: PropTypes.string,
};

export default LoadingIndicator;
