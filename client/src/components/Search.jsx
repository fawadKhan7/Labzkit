import { BiSearch } from "react-icons/bi";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative w-full max-w-md ">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 py-1 text-sm border-b-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#00A76F] focus:border-[#00A76F] transition-all duration-300 placeholder-gray-500"
      />
      <BiSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        size={16}
      />
    </div>
  );
};

export default SearchInput;
