import React from "react";
import { Carousel } from "antd";

const OfferCrousel = ({ urls }) => {
  return (
    <Carousel autoplay draggable >
      {urls?.map((img, index) => (
        <div key={index}>
          <img
            style={{
              width: "100%",
              height: "400px",
              objectFit: "contain",  
              objectPosition: "center",
            }}
            src={img?.url}
            alt={`offer-${index}`} 
          />
        </div>
      ))}
    </Carousel>
  );
};

export default OfferCrousel;
