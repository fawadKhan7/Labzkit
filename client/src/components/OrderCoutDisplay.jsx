import CountUp from "react-countup";

const OrderCountDisplay = ({ duration = 5 }) => {
  return (
    <div className="md:flex md:flex-row flex-col items-center justify-center h-auto gap-10">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-medium">Orders Completed</h3>
        <CountUp
          start={0}
          end={550}
          duration={duration}
          separator=","
          suffix="+"
          className="text-[50px] md:text-[70px] font-bold text-gray-800 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-medium">Total Products Sold</h3>
        <CountUp
          start={0}
          end={976}
          duration={5}
          separator=","
          className="text-[50px] md:text-[70px] font-bold text-gray-800 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-medium">Total Reviews</h3>
        <CountUp
          start={0}
          end={350}
          duration={5}
          separator=","
          className="text-[50px] md:text-[70px] font-bold text-gray-800 "
        />
      </div>
    </div>
  );
};

export default OrderCountDisplay;
