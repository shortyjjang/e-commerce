import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image, { ImageLoader } from "next/image";
import { useInView } from "react-intersection-observer";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  loader?: ImageLoader;
  quality?: number;
  loading?: "eager" | "lazy" | undefined;
  placeholder?: PlaceholderValue
  blurDataURL?: string;
}

const LazyImage = ({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  sizes,
  className,
  style,
  onLoad,
  onError,
  loader,
  quality,
  loading,
  placeholder,
  blurDataURL,
}: LazyImageProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // 한 번 로드되면 다시 감지하지 않음
    threshold: 0.1, // 10%가 화면에 나타날 때 로드
  });

  return (
    <div ref={ref} style={{ width, height, backgroundColor: "#f0f0f0" }}>
      {inView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          className={className}
          style={style}
          onLoad={onLoad}
          onError={onError}
          loader={loader}
          quality={quality}
          loading={loading}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
        />
      ) : null}
    </div>
  );
};

export default LazyImage;
