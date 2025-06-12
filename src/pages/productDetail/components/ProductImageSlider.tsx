import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { ImageWithLoader } from '@/components/ImageWithLoader';

interface ProductImageSliderProps {
  imagesUrl: string[];
  productName: string;
  id: string;
  onImageClick: (index: number) => void;
}

export function ProductImageSlider({
  imagesUrl,
  productName,
  id,
  onImageClick,
}: ProductImageSliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      spaceBetween={12}
      pagination={{ clickable: true }}
      // Tự động chạy nếu có nhiều hơn 1 ảnh
      autoplay={imagesUrl.length > 1 ? { delay: 3000, disableOnInteraction: false } : false}
      loop={imagesUrl.length > 1} // Lặp lại slide nếu nhiều hơn 1 ảnh
      className="w-full"
    >
      {imagesUrl.map((url, index) => (
        <SwiperSlide key={index} onTouchStart={(e) => e.stopPropagation()}>
          <div className="aspect-square w-full overflow-hidden rounded-lg">
            <ImageWithLoader
              src={url}
              alt={`${productName} - ${index}`}
              className="w-full h-full object-cover"
              onClick={() => onImageClick(index)} // Bật popup ảnh lớn khi click
              style={{
                // Dùng viewTransitionName cho ảnh đầu tiên giúp hiệu ứng chuyển cảnh mượt hơn (nếu browser hỗ trợ)
                viewTransitionName: index === 0 ? `product-image-${id}` : undefined,
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
