import React, { useState } from "react";
import { toast } from "sonner";
import emptyCart from "../../src/assets/empty-cart.webp";
import { ICartItems } from "../component/Product/CardDetails";
import CartItem from "../component/Product/cartItems";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cartItems, setCartItems] = useState<ICartItems[]>(cartLocalStorage);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncrease = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    const updatedCart = cartLocalStorage.filter(
      (product: ICartItems) => product.id !== id
    );
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item remove form cart!");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 h-[100vh] w-[400px] ${
            isOpen ? "scale-100 translate-y-0" : "scale-90 translate-y-10"
          }`}
        >
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end ">
            <div className="bg-white w-full max-w-md h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  X
                </button>
              </div>

              {/* Empty Cart Content */}
              <div className="flex-1 flex flex-col p-4 space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              {cartItems?.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-4">
                  <div className="relative w-32 h-32 mb-4">
                    <img src={emptyCart} alt="" className="object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold">Your cart is empty.</h3>
                  <p className="text-gray-600">
                    Please add product to your cart list
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="border-t p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Subtotal:</span>
                    <span className="font-semibold">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Final price and discounts will be determined at the time of
                    payment processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
