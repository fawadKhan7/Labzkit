import React from "react";
import Discount from "../../assets/discount.jpg";
import { WhatsAppOutlined } from "@ant-design/icons";
import { BsChat, BsHouse } from "react-icons/bs";

const AboutUS = () => {
  return (
    <div className="flex flex-col w-full md:w-[800px] mx-auto gap-6 my-8">
      <div className="font-bold text-center text-4xl">About Labzkit</div>
      <div className="bg-[#eff5ec] p-6 ">
        <p>
          Welcome to Labzkit, Australia's premier destination for top-quality
          laboratory equipment and supplies. We are dedicated to providing
          scientists, educators, and medical professionals with a comprehensive
          range of products to support their critical work.
        </p>
        <p className="mt-4 font-semibold">Our Product Range</p>
        <ul className="list-disc pl-6">
          <li>
            Protective Gear: Lab coats, safety goggles, sterile nitrile gloves,
            and face masks to ensure your safety in the lab.
          </li>
          <li>
            Laboratory Instruments: Bunsen burners, centrifuges, microscopes,
            spectrophotometers, and incubators for precise scientific
            applications.
          </li>
          <li>
            Glassware and Consumables: Beakers, test tubes, Erlenmeyer flasks,
            funnels, graduated cylinders, wash bottles, watch glasses,
            crucibles, and droppers for everyday lab use.
          </li>
          <li>
            Measuring Tools: Pipettes, thermometers, balances, and magnifying
            glasses for accurate measurements.
          </li>
          <li>
            Specialized Equipment: Autoclaves, fume hoods, alcohol burners, wire
            loops, tongs, and more to meet diverse laboratory needs.
          </li>
        </ul>
        <p className="mt-4 font-semibold">Why Choose Labzkit?</p>
        <ul className="list-disc pl-6">
          <li>
            Quality Assurance: We source our products from reputable
            manufacturers to ensure they meet the highest industry standards.
          </li>
          <li>
            Australian Owned and Operated: As a proud Australian company, we
            understand the unique needs of our local scientific community.
          </li>
          <li>
            Competitive Pricing: We offer high-quality products at competitive
            prices, making advanced laboratory equipment accessible to all.
          </li>
          <li>
            Exceptional Customer Service: Our knowledgeable team is here to
            assist you with product selection, technical support, and any
            inquiries you may have.
          </li>
          <li>
            Fast and Reliable Shipping: We ensure prompt delivery across
            Australia, so you can rely on us to keep your lab running smoothly.
          </li>
        </ul>
        <p className="mt-4">
          At Labzkit, we are committed to supporting the advancement of science
          and education in Australia. We strive to provide the tools necessary
          for innovation, discovery, and learning, ensuring that our customers
          have access to the best laboratory equipment available.
        </p>
        <p className="my-4 font-semibold">
          Thank you for choosing Labzkit as your trusted partner in laboratory
          supplies.
        </p>
      </div>
      <div className="font-bold text-center text-4xl">Contact Us</div>
      <div className="bg-[#eff5ec] p-6">
        <p>
          We invite you to explore our website and discover how Labzkit can meet
          your laboratory needs. For any inquiries or assistance, please don't
          hesitate to contact our customer service team.
        </p>
        <p className="mt-4 flex items-center gap-2">
          <WhatsAppOutlined style={{ color: "#00A76F", fontSize: 24 }} /> (+92)
          3112752474
        </p>
        <p className="mt-4 flex items-center gap-2">
          <BsChat style={{ color: "#67aeff", fontSize: 24 }} />{" "}
          labzkit@gmail.com
        </p>
        <p className="mt-4 flex items-center gap-2">
          <BsHouse style={{ color: "#141a3c", fontSize: 24 }} /> P.O Box 255
          Mernda VIC 3754
        </p>
      </div>
      <div className="font-bold text-xl">For Discount</div>
      <div class="max-w-2xl mx-auto p-4">
        {" "}
        <div class="border border-gray-300 rounded-lg overflow-hidden">
          {" "}
          <div class="bg-[#d7e4c2] p-3 text-center font-medium">
            {" "}
            Save More with Bulk Discounts!{" "}
          </div>{" "}
          <div class="p-3 border-b border-gray-300 text-sm">
            {" "}
            Below are the available bulk discount rates for each individual item
            when you purchase a certain amount:{" "}
          </div>{" "}
          <table class="w-full">
            {" "}
            <thead>
              {" "}
              <tr class="border-b border-gray-300">
                {" "}
                <th class="py-2 px-4 text-center">Purchase Range</th>{" "}
                <th class="py-2 px-4 text-center">Discount</th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              <tr class="border-b border-gray-300">
                {" "}
                <td class="py-2 px-4 text-center">Buy 5 - 9</td>{" "}
                <td class="py-2 px-4 text-center">3% off</td>{" "}
              </tr>{" "}
              <tr class="border-b border-gray-300">
                {" "}
                <td class="py-2 px-4 text-center">Buy 10 - 24</td>{" "}
                <td class="py-2 px-4 text-center">5% off</td>{" "}
              </tr>{" "}
              <tr class="border-b border-gray-300">
                {" "}
                <td class="py-2 px-4 text-center">Buy 25 - 49</td>{" "}
                <td class="py-2 px-4 text-center">10% off</td>{" "}
              </tr>{" "}
              <tr class="border-b border-gray-300">
                {" "}
                <td class="py-2 px-4 text-center">Buy 50 or above</td>{" "}
                <td class="py-2 px-4 text-center">15% off</td>{" "}
              </tr>{" "}
            </tbody>{" "}
          </table>{" "}
          <div class="bg-[#d7e4c2] p-3 text-center text-sm">
            {" "}
            <p  class="underline hover:text-gray-700">
              {" "}
              For orders over 100pc, please contact us HERE for the best Price{" "}
            </p>{" "}
          </div>{" "}
        </div>
      </div>{" "}
    </div>
  );
};

export default AboutUS;
