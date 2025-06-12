import { useState } from 'react';
import type { ImgHTMLAttributes, ReactNode } from 'react';

interface ImageWithLoaderProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: ReactNode;
  wrapperClassName?: string;
  aspectRatio?: string; // eg. "16/9", "1/1", "4/3"
}

export function ImageWithLoader({
  src,
  alt = '',
  placeholder,
  wrapperClassName = '',
  aspectRatio,
  className = '',
  ...props
}: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);

  const ratioClass = aspectRatio ? `aspect-[${aspectRatio}]` : '';

  return (
    <div className={`relative w-full overflow-hidden ${ratioClass} ${wrapperClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {placeholder || (
            <div className="w-6 h-6 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
          )}
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
}
