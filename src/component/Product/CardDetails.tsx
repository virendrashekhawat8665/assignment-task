import React, { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { IProducts } from "../../pages/home";
import { toast } from "sonner";

interface CommonProps {
  item: IProducts;
}
export interface ICartItems {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
}
const CardDetails: React.FC<CommonProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const selectedValue = cartLocalStorage.filter((x: any) => x.id == item.id);
  useEffect(() => {
    console.log(selectedValue, "cartLocalStorage");
    if (selectedValue?.length > 0 && selectedValue[0]?.quantity !== quantity) {
      setQuantity(selectedValue[0]?.quantity);
    }
    return () => {};
  }, [cartLocalStorage]);

  const handleAddToCart = (item: ICartItems) => {
    debugger;
    const cart: ICartItems[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Item added to cart!");
  };
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square">
            <img
              src={item?.image}
              alt={item?.title}
              className="object-contain w-100"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{item?.title}</h1>
              <p className="text-sm">{item?.category}</p>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">
                  ₹{item?.price}
                </p>
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="font-medium">Body Colour</h3>
              <div className="flex gap-4">
                <button className="border-2 border-primary">
                  Antique Brass
                </button>
                <button>Brushed Nickle</button>
              </div>
            </div>

            {/* Product Features */}
            <div className="space-y-4">
              <p className="text-sm">{item.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button
                    className="rounded-r-none"
                    onClick={() => {
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
                    }}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 px-3 py-2 border-y text-center"
                  />
                  <button
                    className="rounded-r-none"
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                    }}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() =>
                    handleAddToCart({ ...item, quantity: quantity })
                  }
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
