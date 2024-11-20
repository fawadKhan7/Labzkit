import React from "react";
import { PhoneFilled } from "@ant-design/icons";
import { BsChat, BsSendArrowDown, BsSendArrowUp } from "react-icons/bs";

const ContactUs = () => {
  return (
    <div className="flex flex-col w-full md:w-[800px] mx-auto gap-6 my-8">
      <div className="font-bold text-xl">Contact Us</div>
      <p>
        We're dedicated to providing exceptional customer service and
        personalized attention to our customers. Whether you're a small business
        owner or a large organization, we're here to help you find the perfect
        uniforms and workwear for your needs.
      </p>
      <div className="bg-[#eff5ec] p-6 w-full md:w-1/2 mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-xl">
          <PhoneFilled className="transform rotate-90" />
          <p className="font-semibold">Call Us</p>
        </div>
        <p>Our Friendly team is here to help.</p>
        <div className="flex items-center gap-4">
          <p>Online</p>
          <p className="text-green-500 font-bold">(61) 469248696</p>
        </div>
      </div>

      <div className="bg-[#eff5ec] p-6 w-full md:w-1/2 mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-xl">
          <BsChat />
          <p className="font-semibold">Send Us Email</p>
        </div>
        <p>Our Friendly team is here to help.</p>
        <div className="flex items-center gap-4">
          <p>Online</p>
          <a
            className="text-green-500 font-bold"
            href="mailto: labzkit@gmail.com"
          >
            {" "}
            labzkit@gmail.com{" "}
          </a>
        </div>
      </div>
      <div className="bg-[#eff5ec] p-6 w-full md:w-1/2 mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <BsSendArrowUp />
          <p className="font-semibold text-xl">Visit Us</p>
        </div>
        <p>Come say hello at our retail stores.</p>
        <p className="text-sm">
          Mon-Fri 9am to 5pm Sat 9.30 to 12pm Sun Closed
        </p>
        <div className="flex items-center gap-4 text-sm">
          <p className="text-green-500 font-bold ">
            2 MATTAMBER RD WOLLERT VIC, Melbourne, VIC
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
