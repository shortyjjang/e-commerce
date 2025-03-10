import PaymentSuccess from "@/features/Order/Payment/PaymentSuccess";
import { ErrorResponse, Payment } from "@/features/Order/Payment/type";

export default async function OrderSuccessPage(params: {
  paymentKey: string;
  orderId: string;
  amount: number;
}) {
  const { paymentKey, orderId, amount } = params;

  // success 페이지에서 새로고침시 다른 에러가 발생할 수 있다. 따라서 처리를 해줘야 한다.
  if (!paymentKey) {
    return {
      props: { isError: true },
    };
  }
  // 결제 승인
  try {
    // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
    const buffer = Buffer.from(
      `${process.env.NEXT_PUBLIC_TOSS_WIDGET_SECRET_KEY}:`
    ).toString("base64");
    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
        headers: {
          Authorization: `Basic ${buffer}`,
        },
      }
    );
    if (!response.ok) {
      return {
        redirect: {
          destination: `/order/fail?code=${
            'NETWORK_ERROR'
          }&message=${encodeURIComponent('네트워크 오류가 발생했습니다.')}`,
          permanent: false,
        },
      }
    }
    const payment: Payment = await response.json();

    return <PaymentSuccess payment={payment} isError={false} />;
  } catch (err: unknown) {
    const error = err as ErrorResponse;

    // success 페이지에서 새로고침시 다른 에러가 발생할 수 있다. 따라서 처리를 해줘야 한다.
    // 이미 결제가 된 경우 에러를 표시합니다.
    if (error.response.data.code === "ALREADY_PROCESSED_PAYMENT") {
      return {
        redirect: {
          destination: `/order/fail?code=${
            error.response.data.code
          }&message=${encodeURIComponent(error.response.data.message)}`,
          permanent: false,
        },
      }
    }

    return {
      redirect: {
        destination: `/order/fail?code=${
          error.response.data.code
        }&message=${encodeURIComponent(error.response.data.message)}`,
        permanent: false,
      },
    };
  }
}
