import React from "react";
import "./health.css";
const ImageSrc4 = "./assets/Group1.png";
const ImageSrc3 = "./assets/Group 2 (3).png";
const ImageSrc2 = "./assets/Group3.png";
const ImageSrc1 = "./assets/Group4.png";
export default function Healthadvice() {
  return (
    <div className="healthadvice w-full">
      <div className="advicetitle">Health Advice</div>
      <div className="advicepics">
        <div className="iii">
          <img className="img1" src={ImageSrc4} alt="Description" />
          <img className="img2" src={ImageSrc3} alt="Description" />
        </div>
        <div className="mmm">
          <img className="img3" src={ImageSrc2} alt="Description" />
          <img className="img4" src={ImageSrc1} alt="Description" />
        </div>
      </div>
      <div className="lastline">
        <div className="last">
          <p className="lastlinecontent">
            Breathe deeply and embrace the fresh air! <br />
            Plan outdoor adventures without a worry
          </p>
        </div>
      </div>
    </div>
  );
}