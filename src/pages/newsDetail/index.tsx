import { useLocation, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useNewsDetail } from 'miniapp-core/src';
import { ImageViewer } from 'zmp-ui';
import { ShareButton } from '@/components/ShareButton';

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { news, loading } = useNewsDetail(id);
  const [visible, setVisible] = useState(false);

  // Tổng hợp dữ liệu từ API hoặc location.state fallback
  const newsData = useMemo(() => {
    const fallback = location.state?.news || {};
    return {
      imageUrl: news?.imageUrl ?? fallback.imageUrl ?? '',
      title: news?.title ?? fallback.title ?? '',
      description: news?.description ?? fallback.description ?? '',
    };
  }, [news, location.state]);

  const { imageUrl, title, description } = newsData;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* Hình ảnh */}
        <div className="aspect-square w-full overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onClick={() => setVisible(true)}
            style={{ viewTransitionName: `news-image-${id}` }}
          />
        </div>

        {/* Tiêu đề */}
        {title && (
          <>
            <div className="bg-white h-2 w-full" />
            <div className="p-4">
              <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
            </div>
          </>
        )}

        {/* Share button */}
        {!loading && (
          <div className="px-4">
            <ShareButton
              title={title}
              thumbnail={imageUrl}
              path={`/news/${id}`}
              label="Chia sẻ bài viết"
            />
          </div>
        )}

        {/* Skeleton hoặc mô tả */}
        {loading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className={`h-[14px] ${idx % 2 ? 'w-3/5' : 'w-4/5'} bg-skeleton animate-pulse rounded`}
              />
            ))}
          </div>
        ) : description ? (
          <>
            <div className="bg-section h-2 w-full mt-4" />
            <div className="p-4">
              <div
                className="text-sm text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </>
        ) : null}
      </div>

      {/* Image preview */}
      <ImageViewer
        visible={visible}
        onClose={() => setVisible(false)}
        activeIndex={0}
        images={[{ src: imageUrl, alt: title }]}
      />
    </div>
  );
}
