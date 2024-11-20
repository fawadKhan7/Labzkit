import Kid from "../assets/kid.jpg";
import Men from "../assets/men.png";
import Women from "../assets/women.jpg";

export const getImageUrl = (img) => {
  return `${process.env.REACT_APP_BACKEND_URL}/uploads/${img}`;
};

export const imagesProduct = {
  Kids: Kid,
  Men: Men,
  Women: Women,
};
