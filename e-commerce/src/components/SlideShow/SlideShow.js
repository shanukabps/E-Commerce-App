import React from "react";
import "./SlideShow.css";
function SlideShow() {
  return (
    <div className="slid">
      <div className="slider">
        <div className="slides">
          {/* <!--radio buttons start--> */}
          <input type="radio" name="radio-btn" id="radio1" />
          <input type="radio" name="radio-btn" id="radio2" />
          <input type="radio" name="radio-btn" id="radio3" />
          <input type="radio" name="radio-btn" id="radio4" />
          {/* <!--radio buttons end-->
        <!--slide images start--> */}
          <div className="slide first">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2093ae86877801.5da700d5ec0e6.png"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src="https://zestyio.media.zestyio.com/promo-content-marketing-tool.png"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/3E5F89A3-ADF4-26C3-1BF6EA719F77BE2C.jpg"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src="https://www.techadvisor.co.uk/cmsdata/features/3364133/razer-blade1_thumb1200_4-3.jpg"
              alt=""
            />
          </div>
          {/* <!--slide images end-->
        <!--automatic navigation start--> */}
          <div className="navigation-auto">
            <div className="auto-btn1"></div>
            <div className="auto-btn2"></div>
            <div className="auto-btn3"></div>
            <div className="auto-btn4"></div>
          </div>
          {/* <!--automatic navigation end--> */}
        </div>
        {/* <!--manual navigation start--> */}
        <div className="navigation-manual">
          <label for="radio1" className="manual-btn"></label>
          <label for="radio2" className="manual-btn"></label>
          <label for="radio3" className="manual-btn"></label>
          <label for="radio4" className="manual-btn"></label>
        </div>
        {/* <!--manual navigation end--> */}
      </div>
    </div>
  );
}

export default SlideShow;
