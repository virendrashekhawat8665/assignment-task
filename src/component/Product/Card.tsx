import React from "react";
import { IProducts } from "../../pages/home";
import { Link } from "react-router-dom";

interface CommonProps {
  item: IProducts;
}

const Card: React.FC<CommonProps> = ({ item }) => {
  return (
    <div className="max-w-sm mx-3 p-4 bg-white rounded-lg shadow-md">
      <img
        src={item?.image}
        alt="Card image"
        className="w-full h-48 rounded-lg object-contain"
      />
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 singleLineText">
          {item?.title}
        </h2>
        <p className="text-gray-600 mt-2 threeLineText">{item?.description}</p>
        <div className="flex justify-between items-center ">
          <Link to={`product/${item?.id}`}>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View Details
            </button>
          </Link>
          <h2 className="text-lg font-bold text-gray-800 ">₹ {item?.price}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
