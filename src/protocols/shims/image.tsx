import type { CSSProperties, ImgHTMLAttributes } from "react";

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  unoptimized?: boolean;
  placeholder?: string;
}

const BASE = import.meta.env.BASE_URL;

/** Stand-in for next/image: a plain <img> with base-aware paths (no resizing). */
export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  quality: _quality,
  unoptimized: _unoptimized,
  placeholder: _placeholder,
  style,
  ...rest
}: ImageProps) {
  const resolved = src.startsWith("/") ? `${BASE}${src.slice(1)}` : src;
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : undefined;
  return (
    <img
      src={resolved}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  );
}
