import React from "react";
import { ICartItems } from "./CardDetails";

export interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
interface CartItemProps {
  item: ICartItems;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.title} className="w-16 h-16 rounded" />
        <div>
          <h3 className="text-sm font-medium">{item.title}</h3>
          <p className="text-xs text-gray-500">
            {item.price} x {item.quantity}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(item.id)}
          className="text-sm px-2 py-1 border rounded text-gray-700 hover:bg-gray-100"
        >
          -
        </button>
        <span className="text-sm">{item.quantity}</span>
        <button
          onClick={() => onIncrease(item.id)}
          className="text-sm px-2 py-1 border rounded text-gray-700 hover:bg-gray-100"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 text-sm px-2"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CartItem;
