import { BiSearch } from "react-icons/bi";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 py-2 text-md border-0 border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-600 transition-all duration-300 placeholder-gray-500"
      />
      <BiSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        size={20}
      />
    </div>
  );
};

export default SearchInput;
