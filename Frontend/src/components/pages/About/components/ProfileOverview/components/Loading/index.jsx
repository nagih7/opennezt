import React from "react";
import "./index.scss";

const Loading = () => {
  return (
    <div className="flex items-center">
      <div className="loading rounded-md my-auto">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <div className="loader">
        <div className="scanner">
          <span>OpenNezt...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
