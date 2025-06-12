// src/components/LoadingOverlay.tsx
import React from 'react';
import { useLoading } from 'miniapp-core/src';
import AppLogo from '@/assets/images/logo.jpg';
import { Avatar, Spinner } from 'zmp-ui';

export const LoadingOverlay = () => {
  const isLoading = useLoading();

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div className="flex flex-col items-center space-y-2">
        <Spinner visible logo={<Avatar src={AppLogo} />} />
      </div>
    </div>
  );
};
