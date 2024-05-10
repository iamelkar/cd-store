"use client";
import Logout from "@/components/Logout";
import CartButton from "@/components/Cart";
import prisma from "@/utils/prisma/db";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Homepage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userAuth = async () => {
      const supabase = createClient();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user || error) {
        return router.push("/login");
      }
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
    };
    userAuth();

    // const fetchCartItems = async () => {
    //   const response = await fetch("/cart");
    //   const data = await response.json();
    //   setCart(data);
    // };
    // fetchCartItems();
  }, []);

  const addToCart = async (productId) => {
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: productId }),
    });

    const updatedCartItem = await response.json();
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === productId ? updatedCartItem : item
        );
      }
      return [...prevCart, updatedCartItem];
    });
  };

  const removeFromCart = async (productId) => {
    const response = await fetch("/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: productId }),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Logout />
      <CartButton />
      <h1 className="text-3xl font-bold text-center my-8">
        CD Store Home Page
      </h1>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group border rounded-lg p-4 m-4 w-64 bg-white shadow-md flex flex-col justify-between"
          >
            <img
              src={product.pictureUrl}
              alt={product.name}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold line-clamp-1 truncate">
              {product.name}
            </h2>
            <p className="text-gray-700 text-justify line-clamp-3 pt-2">
              {product.description}
            </p>
            <p className="text-green-600 font-bold w-full border-t-2 border-purple-400 py-2 mt-2">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={() => addToCart(product.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-0 z-10 relative"
            >
              Add to Cart
            </button>
            <button
              onClick={() => removeFromCart(product.id)}
              className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 z-10 relative"
            >
              Remove
            </button>

            {/* Hover details */}
            <div
              className="absolute top-0 left-0 right-0 bottom-36 flex flex-col justify-center 
            items-center bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 rounded-lg overflow-y-auto"
            >
              <h2 className="text-l font-bold pt-4">{product.name}</h2>
              <p className="mt-2 text-justify">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
