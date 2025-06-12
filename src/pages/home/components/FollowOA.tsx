import { FC } from 'react';
import { Box, Button, Text } from 'zmp-ui';
import { hexToRGBA, getCSSVariableValue } from 'miniapp-core/src';
import AppLogo from '@/assets/images/logo.jpg';
import { useAppConfig } from 'miniapp-core/src';

export const FollowOA: FC = () => {
  const config = useAppConfig();
  const primaryColor = getCSSVariableValue('--primary');
  const bgColor = hexToRGBA(primaryColor, 0.1);
  const name = config?.branding.title || 'MiniApp';
  // TODO: Uncomment when logoUrl is available in config
  // const logo = config?.branding.logoUrl || AppLogo;
  const logo = AppLogo;

  return (
    <div className="pl-4 pr-4 bg-white mt-4">
      <div
        className="p-4 rounded-lg shadow-md border"
        style={{
          backgroundColor: bgColor,
          borderColor: primaryColor,
        }}
      >
        {' '}
        {/* Dòng trên */}
        <Text size="xxSmall">Quan tâm OA để nhận các chương trình đặc quyền ưu đãi</Text>
        <div className="w-full my-2 border-t-[1px] border-white" />
        {/* Row dưới */}
        <div className="flex gap-2 items-center justify-between">
          <img src={logo} alt="App Logo" className="w-10 h-10 rounded-full" />
          <Box className="flex-1">
            <Text.Title className="text-black font-base text-sm">{name}</Text.Title>
          </Box>
          <Button className="bg-primary" size="small">
            Quan tâm
          </Button>
        </div>
      </div>
    </div>
  );
};
