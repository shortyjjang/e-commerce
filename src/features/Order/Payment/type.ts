export interface Payment {
    orderName: string;
    approvedAt: string;
    receipt: {
      url: string;
    };
    totalAmount: number;
    method: '카드' | '가상계좌' | '계좌이체';
    paymentKey: string;
    orderId: string;
    status:
      | 'READY'
      | 'IN_PROGRESS'
      | 'WAITING_FOR_DEPOSIT'
      | 'DONE'
      | 'CANCELED'
      | 'PARTIAL_CANCELED'
      | 'ABORTED'
      | 'EXPIRED';
  }
  
  export interface PaymentMethodsWidget {
    updateAmount: (amount: number, reason?: string | string[]) => void;
    UPDATE_REASON: {
      COUPON: string;
      POINT: string;
    };
    on: (eventName: string, callback: (selectedPaymentMethod: string) => unknown) => void;
    getSelectedPaymentMethod: () => {
      type: 'NORMAL' | 'BRANDPAY' | 'KEYIN' | 'CUSTOM';
      method?: string;
      easyPay?: {
        provider: string;
      };
      paymentMethodKey?: string;
    };
  }
  
  export interface ErrorResponse {
    response: {
      data: {
        message: string;
        code: string;
      };
    };
  }