import React from "react";
import { Carousel } from "antd";
import { getImageUrl } from "../utils/functions";

const OfferCrousel = ({ urls }) => {
  return (
    <Carousel autoplay >
      {urls?.map((img, index) => (
        <div key={index}>
          <img
            style={{
              width: "100%",
              height: "400px",
              objectFit: "contain",  
              objectPosition: "center",
            }}
            src={getImageUrl(img?.url)}
            alt={`offer-${index}`} 
          />
        </div>
      ))}
    </Carousel>
  );
};

export default OfferCrousel;
