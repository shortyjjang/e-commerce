"use client";
import Button from "@/etities/Button";
import { usePayment } from "@/hooks/usePayment";
import { useCart } from "@/layout/LayoutProvider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PaymentList from "./PaymentList";

export default function TossPayment() {
  const router = useRouter();
  const { paymentItems } = useCart();
  const { paymentWidget, handlePaymentRequest } = usePayment();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 상품 가격 계산
  const price = paymentItems.reduce((acc, curr) => {
    if (curr.options.length === 0) {
      // 옵션이 없는 경우
      return acc + curr.salePrice * curr.quantity;
    } else {
      // 옵션이 있는 경우
      const optionsTotal = curr.options.reduce(
        (optionAcc, option) =>
          optionAcc + option.option.optionPrice * option.quantity,
        0
      );
      return acc + optionsTotal;
    }
  }, 0);

  const deliveryFee = paymentItems.reduce((acc, curr) => {
    if (curr.deliveryFeeType === "ALL") {
      return acc + curr.deliveryFee;
    } else {
      return acc + curr.deliveryFee * curr.quantity;
    }
  }, 0);

  // 토스페이먼츠 위젯 렌더링
  useEffect(() => {
    if (paymentWidget == null || hasError) {
      return;
    }

    try {
      // 결제위젯 렌더링
      paymentWidget.renderPaymentMethods(
        "#payment-widget",
        { value: price },
        { variantKey: "DEFAULT" }
      );

      // 이용약관 렌더링
      paymentWidget.renderAgreement("#agreement", {
        variantKey: "AGREEMENT",
      });
    } catch (error) {
      setHasError(true);
      setErrorMessage("결제 위젯 렌더링 중 오류가 발생했습니다.");
      if (process.env.NODE_ENV === "development") {
        console.error("결제 위젯 렌더링 중 오류:", error);
      }
      router.back();
    }
  }, [hasError, paymentWidget, price, router]);

  // 이미 오류가 발생했다면 오류 메시지 표시
  if (hasError) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">결제 오류 발생</h2>
        <p className="mb-6">
          {errorMessage || "인증되지 않은 시크릿 키 혹은 클라이언트 키입니다."}
        </p>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded"
          onClick={() => router.back()}
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <PaymentList />
      <div className="relative bg-white rounded-lg p-4">
        {/* 최종금액 */}
        <div className="flex flex-col gap-1 mt-4 lg:mt-0">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-500">총 상품금액</label>
            <span>{price.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-500">배송비</label>
            <span>{deliveryFee.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between items-center text-lg font-semibold border-t pt-2 mt-1">
            <label className="text-base">총 금액</label>
            <span>{(price + deliveryFee).toLocaleString()}원</span>
          </div>
        </div>
      </div>
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id="payment-widget" />
      <div id="agreement" />
      <Button
        variant="primary"
        className="w-full"
        onClick={async () => {
          await handlePaymentRequest(paymentItems);
        }}
      >
        {(price + deliveryFee).toLocaleString()}원 결제하기
      </Button>
    </div>
  );
}
