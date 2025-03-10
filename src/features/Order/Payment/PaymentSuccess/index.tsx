'use client'
import MoreSpinner from "@/etities/MoreSpinner";
import { useCart } from "@/layout/LayoutProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Payment } from "../type";

export default function PaymentSuccess({
  payment,
  isError,
}: {
  payment: Payment;
  isError: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { orderNumber } = useCart();
  const router = useRouter();

  useEffect(() => {
    // 에러이면서 주문번호가 있으면 주문 내역 화면을 보여줍니다.
    if (isError && orderNumber) {
      router.push(`/order/receipt`);
      return;
    } else if (isError) {
      // 에러만 있다면 에러 화면을 보여줍니다.
      router.push("/error");
      return;
    }

    // payment의 상태가 DONE일 때만 완료 화면을 보여줍니다.
    if (payment && payment.status === "DONE") setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <MoreSpinner />;
  }
  return (
    <div>
      <h1>결제 완료</h1>
      <p>{payment.orderId}</p>
      <p>{payment.orderName}</p>
      <p>{payment.status}</p>
      <p>{payment.totalAmount}</p>
      <p>{payment.method}</p>
      <p>{payment.paymentKey}</p>
      <p>{payment.approvedAt}</p>
      <p>{payment.receipt.url}</p>
    </div>
  );
}
