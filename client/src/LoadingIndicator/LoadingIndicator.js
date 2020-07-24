import React from "react";
import "./LoadingIndicator.scss";

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

export default LoadingIndicator;
