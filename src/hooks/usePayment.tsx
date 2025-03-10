import { CartItem } from "@/layout/LayoutProvider";
import { getOrderId } from "@/query/getOrderId";
import { useQuery } from "@tanstack/react-query";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { useRouter } from "next/navigation";

const TOSS_WIDGET_CLIENT_KEY =
  process.env.NEXT_PUBLIC_TOSS_WIDGET_CLIENT_KEY || "";
const CUSTOMER_KEY = process.env.NEXT_PUBLIC_CUSTOMER_KEY || "";

export const usePayment = () => {
  const router = useRouter();

  const { data: paymentWidget } = useQuery({
    queryKey: ["payment-widget", TOSS_WIDGET_CLIENT_KEY, CUSTOMER_KEY],
    queryFn: async () => {
      try {
        const paymentWidget = await loadPaymentWidget(
          TOSS_WIDGET_CLIENT_KEY,
          CUSTOMER_KEY
        )
        return paymentWidget;
      } catch (error) {
        if(process.env.NODE_ENV === "development") {
          console.error("토스 페이먼츠 위젯 로드 오류:", error);
        }
        return null;
      }
    },
    retry: false, // 인증 오류 발생 시 재시도하지 않음
  });

  const handlePaymentRequest = async (orderList: CartItem[]) => {
    const orderId = await getOrderId(orderList);
    
    if (!orderId) {
      alert("결제 실패");
    }
    // 결제를 요청하기 전에 orderId, amount를 서버(토스)에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: orderId,
        orderName:
          orderList.length > 1
            ? `${orderList[0].productName} 외 ${orderList.length - 1}개`
            : `${orderList[0].productName}`,
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`,
      });
    } catch (error) {
      console.error("결제 요청 오류:", error);
      
      // 인증되지 않은 키 오류 확인
      const errorMessage = String(error);
      if (errorMessage.includes("인증되지 않은") || errorMessage.includes("시크릿 키") || errorMessage.includes("클라이언트 키")) {
        alert("인증되지 않은 시크릿 키 혹은 클라이언트 키입니다. 관리자에게 문의하세요.");
        // 이전 페이지로 리다이렉트
        router.back();
      } else {
        // 다른 오류인 경우
        alert(`결제 요청 중 오류가 발생했습니다: ${errorMessage}`);
      }
    }
  };
  if (!paymentWidget) {
    return { paymentWidget: null, handlePaymentRequest };
  }

  return { paymentWidget, handlePaymentRequest };
};
