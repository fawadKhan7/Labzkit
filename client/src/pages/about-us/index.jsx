import React from "react";
import Discount from "../../assets/discount.jpg";

const AboutUS = () => {
  return (
    <div className="flex flex-col w-[800px] mx-auto gap-6 my-8">
      <div className="font-bold text-xl">About Us</div>
      <div className="bg-[#eff5ec] p-6">
        <p>
          Labzkit take great pride in delivering high-quality uniforms and
          outstanding customer service. Our dedication to excellence has
          established us as a trusted name in the field, with retail locations
          in Hervey Bay and Maryborough, as well as an online store serving
          customers across Australia. At Labzkit, we recognize that a uniform
          is much more than just clothing – it’s a reflection of your brand,
          your values, and your identity. That’s why we collaborate closely with
          each of our customers to provide personalized solutions that meet
          their unique needs. Whether you require corporate, hospitality,
          healthcare, or school uniforms, we have you covered. Our expert team
          is committed to making your shopping experience seamless and
          enjoyable. With a focus on exceptional customer service, we are always
          ready to answer your questions and assist you in any way we can. Our
          passion for what we do drives us to provide the best possible service
          to every customer. We believe uniforms should be comfortable,
          functional, and stylish, which is why we only source our products from
          top-tier suppliers. Using durable, high-quality materials ensures that
          your uniforms will not only look great but also perform well for years
          to come. We’re proud of our legacy and our unwavering commitment to
          quality, and we are excited to continue offering our customers the
          best in uniforms and service.
          <p className="my-1 font-semibold">
            Thank you for choosing Labzkit - we look forward to serving you!
          </p>
        </p>
      </div>
      <div className="font-bold text-xl">For Discount</div>
      <img src={Discount} />
    </div>
  );
};

export default AboutUS;
