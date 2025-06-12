import { ShareDecor } from '@/components/Vectors';
import { openShareSheet } from 'zmp-sdk/apis';
import { Icon } from 'zmp-ui';

interface Props {
  title: string;
  thumbnail: string;
  path: string;
  label?: string;
}

export function ShareButton({ title, thumbnail, path, label = 'Chia sẻ ngay cho bạn bè' }: Props) {
  const handleShare = () => {
    openShareSheet({
      type: 'zmp_deep_link',
      data: { title, thumbnail, path },
    });
  };

  return (
    <button
      className="relative w-full h-10 rounded-lg cursor-pointer overflow-hidden"
      onClick={handleShare}
    >
      <div className="absolute inset-0 bg-[var(--zaui-light-button-secondary-background)] opacity-50" />
      <ShareDecor className="absolute inset-0" />
      <div className="relative flex items-center space-x-1 text-primary text-sm font-medium px-4 py-2 h-full">
        <div>{label}</div>
        <Icon icon="zi-chevron-right" />
      </div>
    </button>
  );
}
