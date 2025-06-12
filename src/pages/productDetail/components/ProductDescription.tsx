import { useRef, useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Section from '@/components/Section';

interface ProductDescriptionProps {
  description?: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState('100px'); // Chiều cao mặc định khi chưa mở rộng
  const contentRef = useRef<HTMLDivElement>(null);

  // Khi thay đổi expanded, cập nhật chiều cao maxHeight cho animation mở rộng / thu gọn mượt
  useEffect(() => {
    if (expanded && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('100px');
    }
  }, [expanded]);

  const hasLongDescription = description && description.length > 100;

  return (
    <Section title="Mô tả sản phẩm">
      <div className="relative px-4 pb-4">
        <div
          ref={contentRef}
          className="text-sm text-subtitle overflow-hidden transition-all duration-300"
          style={{ maxHeight }}
          // Sử dụng DOMPurify để tránh XSS khi render html description
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description || 'Chưa có mô tả') }}
        />

        {/* Gradient overlay che phần bị ẩn khi chưa mở rộng */}
        {!expanded && hasLongDescription && (
          <div
            className="absolute left-4 right-4 bottom-[40px] h-12 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)',
            }}
          />
        )}

        {/* Nút Xem thêm / Thu gọn */}
        {hasLongDescription && (
          <div className="flex justify-center mt-2">
            <button
              className="text-primary text-xs"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
            >
              {expanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
