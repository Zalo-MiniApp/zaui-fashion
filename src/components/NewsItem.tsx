import { FC, useState } from 'react';
import { Box, Text } from 'zmp-ui';
import { News } from 'miniapp-core/src';
import TransitionLink from '@/components/TransitionLink';
import clsx from 'clsx';

interface Props {
  news: News;
  className?: string;
  fullWidth?: boolean;
}

export const NewsItem: FC<Props> = ({ news, className, fullWidth = false }) => {
  const [selected, setSelected] = useState(false);

  const containerClass = clsx('flex-shrink-0', fullWidth ? 'w-full mb-4' : 'w-[300px]', className);

  const imageClass = clsx('relative', fullWidth ? 'aspect-[16/9]' : 'h-44');

  const textClass = clsx('line-clamp-2 mt-2', fullWidth && 'mb-6');

  return (
    <TransitionLink
      to={`/news/${news.id}`}
      onClick={() => setSelected(true)}
      state={{ news }}
      className={containerClass}
    >
      {() => (
        <>
          <Box className={imageClass}>
            <img
              loading="lazy"
              src={news.imageUrl}
              alt={news.title}
              className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
              style={{
                viewTransitionName: selected ? `news-image-${news.id}` : undefined,
              }}
            />
          </Box>
          <Text className={textClass} size="normal">
            {news.title}
          </Text>
        </>
      )}
    </TransitionLink>
  );
};
