import { CartItem } from "@/layout/LayoutProvider";

export async function getOrderId(orders: CartItem[]) {
  try {
    const response = await fetch("/api/orderId", {
      method: "POST",
      body: JSON.stringify(orders),
    });
    if (!response.ok) {
      throw new Error("Failed to get orderId");
    }
    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error("Error getting orderId:", error);
    throw error;
  }
}
