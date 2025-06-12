import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Payment } from "zmp-sdk";

const PaymentHandler = () => {
  const location = useLocation();

  const clearCart = () => {
  };

  const checkTransaction = (params: any) => {
    // gọi api checkTransaction để lấy thông tin giao dịch
    Payment.checkTransaction({
      data: params,
      success: async (rs) => {
        console.log("Payment.checkTransaction -> success -> ", rs);
      },
      fail: (err) => {
        console.log("Payment.checkTransaction -> fail -> ", err);
      }
    });
  };

  const onOpenApp = (data: any) => {
    console.log("useEvent -> onOpenApp -> ", data);
    const params = data?.path;
    // kiểm tra path trả về từ giao dịch thanh toán
    // RedirectPath: đã cung cấp tại trang tích hợp thanh toán

    if (params.includes("appTransID")) {
      checkTransaction(params);
    }
  };

  const onPaymentClose = (data: any) => {
    console.log("useEvent -> onPaymentClose -> ", data);
    const resultCode = data?.resultCode;
    // kiểm tra resultCode trả về từ sự kiện PaymentClose
    // 0: Đang xử lý
    // 1: Thành công
    // -1: Thất bại
    switch (resultCode) {
      case 0:
        checkTransaction({ zmpOrderId: data?.zmpOrderId });
        break;
      case 1:
        break;
      case -1:
        // Xử lý kết quả thanh toán thất bại
        // TODO: gọi api xóa đơn hàng
        // cancelOrder();
        break;
    }
  };

  const onDataCallback = (resp: any) => {
    console.log("useEvent -> onDataCallback -> ", resp); // eslint-disable-line
    if (!resp) {
    } else {
      const { eventType, data } = resp || {};
      if (eventType === "PAY_BY_BANK") {
        // Nhận dữ liệu kết quả thanh toán và hiển thị cho người dùng với chuyển khoản ngân hàng
        if (data.appTransID) {
          checkTransaction(data);
        }
      }
    }
  };

  useEvent({
    onOpenApp,
    onPaymentClose,
    onDataCallback
  });

  useEffect(() => {
    // kiểm tra giao dịch dùng cho phiên bản zalo k hỗ trợ OpenApp, nhận từ redirect path
    if (location.search.includes("appTransID")) {
      checkTransaction(location.search);
    }
  }, []);

  return <></>;
};

export default PaymentHandler;


import { EventName, events } from "zmp-sdk/apis"; //

type EventTypes = {
  onOpenApp?: (...args: any[]) => void;
  onPaymentClose?: (...args: any[]) => void;
  onDataCallback?: (...args: any[]) => void;
};

export const useEvent = ({
  onOpenApp,
  onPaymentClose,
  onDataCallback
}: EventTypes) => {
  useEffect(() => {
    events.on(EventName.OpenApp, onOpenApp!);
    events.on(EventName.PaymentClose, onPaymentClose!);
    events.on(EventName.OnDataCallback, onDataCallback!);
    return () => {
      events.off(EventName.OpenApp, onOpenApp);
      events.off(EventName.PaymentClose, onPaymentClose);
      events.off(EventName.OnDataCallback, onDataCallback);
    };
  }, []);
};
