import Kid from "../assets/kid.jpg";
import Men from "../assets/men.png";
import Women from "../assets/women.jpg";
import { config } from "../config";

export const getImageUrl = (img) => {
  return `${config.endpoint}/uploads/${img}`;
};

export const imagesProduct = {
  Kids: Kid,
  Men: Men,
  Women: Women,
};
