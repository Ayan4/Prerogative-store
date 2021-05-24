import "./ScreenLoader.scss";
// import { useState } from "react";

function ScreenLoader({ noBg, circleSpinner, dotsSpinner, bgLight }) {
  return (
    <>
      <div
        style={{
          background: bgLight ? "rgba(0,0,0,0.5)" : noBg ? "none" : "#101010"
        }}
        className="screen-loader"
      >
        {circleSpinner && (
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}

        {dotsSpinner && (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </>
  );
}

export default ScreenLoader;
