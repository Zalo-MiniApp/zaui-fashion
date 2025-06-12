import clsx from 'clsx';
import React, { FC } from 'react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from 'zmp-ui';
import { BannerSkeleton } from '@/components/skeleton';
import { useBanners, useStoreInfoLoading, useStoreInfoError } from 'miniapp-core/src';
import 'swiper/css';
import 'swiper/css/pagination';

export const HomeBanner: FC<{ isHorizontal?: boolean }> = ({ isHorizontal = true }) => {
  const banners = useBanners() || [];
  const isLoading = useStoreInfoLoading();
  const error = useStoreInfoError();

  if (isLoading) {
    return <BannerSkeleton isHorizontal={isHorizontal} />;
  }

  if (banners.length === 0) {
    return <div />;
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
    >
      {banners.map((item, idx) => (
        <SwiperSlide key={idx} className="">
          <Box
            className={clsx('w-full bg-cover', {
              'aspect-[3/4]': !isHorizontal,
              'aspect-[16/9]': isHorizontal,
            })}
            style={{
              backgroundImage: `url("${item}")`,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
