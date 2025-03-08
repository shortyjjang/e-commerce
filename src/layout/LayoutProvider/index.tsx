"use client";
import React, { createContext, useContext, useState } from "react";
import { Option } from "@/query/getProductLists";
const CartContext = createContext<{
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  paymentItems: CartItem[];
  setPaymentItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}>({
  cart: [],
  setCart: () => {},
  paymentItems: [],
  setPaymentItems: () => {},
});

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentItems, setPaymentItems] = useState<CartItem[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart, paymentItems, setPaymentItems }}>
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};

export interface CartItem {
  productId: number;
  listImageUrl: string;
  productName: string;
  discountRate: number;
  salePrice: number;
  netPrice: number;
  deliveryFee: number;
  deliveryFeeType: "EACH" | "ALL";
  quantity: number;
  options: {
    option: Option;
    quantity: number;
  }[];
}
