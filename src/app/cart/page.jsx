"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch("/cart");
      const data = await response.json();
      setCart(data);
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (productId) => {
    const response = await fetch("/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    if (response.ok) {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (item) => item.productId === productId
        );
        if (existingItem.quantity > 1) {
          return prevCart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
        return prevCart.filter((item) => item.productId !== productId);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 bg-blue-600 text-white text-center">
        <Link href="/">
          <a className="text-lg font-bold">Back to Home</a>
        </Link>
      </nav>
      <h1 className="text-3xl font-bold text-center my-8">Your Cart</h1>
      <div className="flex flex-wrap justify-center">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 m-4 w-64 bg-white shadow-md"
          >
            <img
              src={item.product.pictureUrl}
              alt={item.product.name}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold">{item.product.name}</h2>
            <p className="text-gray-700">{item.product.description}</p>
            <p className="text-green-600 font-bold">
              ${item.product.price.toFixed(2)}
            </p>
            <p className="text-gray-900">Quantity: {item.quantity}</p>
            <button
              onClick={() => removeFromCart(item.productId)}
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
