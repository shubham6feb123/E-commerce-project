import React, { useRef } from "react";

//css
import "./carousel.css";

//components
import { Carousel } from "antd";

//icons
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const bannerImages = [
  {
    id: 1,
    src: "https://cdn.vox-cdn.com/thumbor/EeQpOMN1j5f3Qmvo1oanEoByZzY=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/20030737/xWZMNYm.png",
  },
  {
    id: 2,
    src: "https://assets.xboxservices.com/assets/56/a7/56a799fc-acc0-4bdd-a513-c7a0df4ebe49.jpg?n=17171717_Content-Placement-0_788x444.jpg",
  },
  {
    id: 3,
    src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mac-family-compare-202104?wid=1276&hei=572&fmt=jpeg&qlt=80&.v=1617294981000",
  },
  {
    id: 4,
    src: "https://www.apple.com/v/macbook-air/k/images/overview/hero_endframe__ea0qze85eyi6_large.jpg",
  },
];

function Carosel() {
     const carouselRef = useRef();

  const slideNext = (e) => {
    carouselRef.current.next();
  }

  const slidePrev = ()=>{
    carouselRef.current.prev();
  }
  return (
    <>
    <div style={{width:"100%",position:"relative"}}>
      <Carousel
        className="carousel"
        // autoplay={true}
        style={{ position: "relative" }}
        ref={carouselRef}
       dots={false}
      >
        {bannerImages.map((image) => (
          <>
            <div key={image.id} style={{ position: "relative" }}>
              <img className="carousel__img" src={image.src} alt="banner" />
            </div>
          </>
        ))}
      </Carousel>
      <div className="left__arrow" id="prev" onClick={slidePrev}>
        <LeftOutlined style={{ fontSize: 25 }} />
      </div>
      <div className="right__arrow" id="next" onClick={slideNext}>
        <RightOutlined style={{ fontSize: 25 }} />
      </div>
      </div>
    </>
  );
}

export default Carosel;
