import { FC } from 'react';
import { Box, Text } from 'zmp-ui';
import { QUICK_ACTION_LOOKUP } from '@/utils/quickAction.config';
import { useAppConfig, useAppConfigLoading } from 'miniapp-core/src';
import TransitionLink from '@/components/TransitionLink';
import { QuickActionsSkeleton } from '@/components/skeleton';

export const QuickAction: FC = () => {
  const config = useAppConfig();
  const isLoading = useAppConfigLoading();

  // Duyệt qua danh sách quickActions từ config và map sang object action cụ thể
  const quickActionsList = (config?.quickActions || [])
    .map(({ key }) => QUICK_ACTION_LOOKUP[key])
    .filter(Boolean);

  if (isLoading) {
    return <QuickActionsSkeleton />;
  }

  return (
    <Box className="py-6 grid grid-rows-1 grid-cols-4 gap-4 bg-white">
      {quickActionsList.map((action, index) => {
        const content = (
          <Box className="flex items-center flex-col flex-1">
            <div className="bg-primary rounded-2xl w-12 h-12 flex items-center justify-center text-primary">
              <img src={action.icon} alt="icon" className="w-6 h-6 object-contain" />
            </div>
            <Text className="text-center mt-1 text-xs">{action.title}</Text>
          </Box>
        );

        // Ưu tiên dùng path nếu có, fallback là <div>
        return action.path ? (
          <TransitionLink key={index} to={action.path} className="cursor-pointer">
            {content}
          </TransitionLink>
        ) : (
          <div key={index}>{content}</div>
        );
      })}
    </Box>
  );
};
