import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Payment } from 'zmp-sdk';
import toast from 'react-hot-toast';
import { ROUTES, useClearAll } from 'miniapp-core/src';
import { useNavigate } from 'react-router-dom';
import { EventName, events } from 'zmp-sdk/apis'; //

const PaymentHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clearCart = useClearAll();

  const checkTransaction = (params: Record<string, any> | string) => {
    Payment.checkTransaction({
      data: params,
      success: (response) => {
        const { resultCode, msg } = response;
        if (resultCode !== -1) {
          toast.success(msg ?? 'Đặt hàng thành công', {
            icon: '🎉',
            duration: 5000,
          });
          navigate(ROUTES.delivery);
          clearCart();
        } else {
          toast.error(msg ?? 'Đặt hàng thất bại', {
            icon: '❌',
            duration: 5000,
          });
        }
      },
      fail: (error) => {
        toast.error('Đặt hàng thất bại', {
          icon: '❌',
          duration: 5000,
        });
      },
    });
  };

  const handleOpenApp = (data: any) => {
    console.log('📲 Open App Event:', data);
    const path = data?.path;
    if (path?.includes('appTransID')) {
      checkTransaction(path);
    }
  };

  const handlePaymentClose = (data: any) => {
    console.log('💳 Payment Close Event:', data);
    const { resultCode, zmpOrderId } = data || {};
    switch (resultCode) {
      case 0:
        checkTransaction({ zmpOrderId });
        break;
      case 1:
        // TODO: Handle success case
        break;
      case -1:
        // TODO: cancelOrder();
        break;
    }
  };

  const handleDataCallback = (resp: any) => {
    console.log('📦 Data Callback Event:', resp);
    // if (!resp) {
    //   toast.error("Đặt hàng thất bại", {
    //     icon: '❌',
    //     duration: 5000,
    //   });
    //   return;
    // }
    const { eventType, data } = resp || {};
    if (eventType === 'PAY_BY_BANK' && data?.appTransID) {
      checkTransaction(data);
    }
  };

  useEvent({
    onOpenApp: handleOpenApp,
    onPaymentClose: handlePaymentClose,
    onDataCallback: handleDataCallback,
  });

  useEffect(() => {
    // fallback for Zalo versions that do not support openApp
    if (location.search.includes('appTransID')) {
      checkTransaction(location.search);
    }
  }, [location.search]);

  return null;
};

export default PaymentHandler;

type EventTypes = {
  onOpenApp?: (...args: any[]) => void;
  onPaymentClose?: (...args: any[]) => void;
  onDataCallback?: (...args: any[]) => void;
};

export const useEvent = ({ onOpenApp, onPaymentClose, onDataCallback }: EventTypes) => {
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
