"use client";
import { createOrder } from "@/helpers/orders.helper";
import { IProduct, userSession } from "@/types";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [token, setToken] = useState<userSession>();
  const [cart, setCart] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      setToken(JSON.parse(userToken!));
      !userToken && redirect("/login");
    }

    const storedCard = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCard) {
      let totalCart = 0;
      storedCard?.map((item: IProduct) => {
        totalCart = totalCart + item.price;
      });
      setTotal(totalCart);
      setCart(storedCard);
    }
  }, []);

  async function handleClick() {
    try {
      const orderProducts = new Set(cart.map((product) => product.id));
      await createOrder(Array.from(orderProducts), token?.token!);
      localStorage.setItem("cart", "[]");
      setCart([]);
      setTotal(0);
      alert("Compra realizada con exito");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <div className="flex flex-row items-center h-[70%] w-full gap-4 px-4">
      <div className="flex flex-row items-center bg-gray-200 p-6 rounded my-4 w-full gap-4">
        {cart.length > 0 ? (
          cart?.map((el) => {
            return (
              <div key={el.id}>
                <div>
                  <p>{el.name}</p>
                  <p>Price: ${el.price}</p>
                </div>
                <img
                  src={el?.image}
                  alt="imagendelproduct"
                  width={100}
                  height={100}
                />
              </div>
            );
          })
        ) : (
          <div>No tienes ningun producto agregado a tu carrito</div>
        )}
      </div>
      <div className="flex flex-col justify-end items-end bg-gray-200 p-6 rounded my-4 w-1/2">
        <p>Total: ${total}</p>
        <button
          onClick={handleClick}
          className="rounded-sm bg-white hober:bg-gray-400 text-black p-2 mt-2"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
