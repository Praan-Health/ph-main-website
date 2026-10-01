import Image, { type ImageProps } from "next/image";

/**
 * next/image with the intrinsic aspect ratio pinned in CSS. next/image serves resized variants whose
 * height is rounded to whole pixels (e.g. 504×444 becomes 256×226), which would otherwise nudge the
 * rendered height by a fraction of a pixel when the image is sized with height: auto.
 */
export function Img({ style, alt, ...props }: ImageProps) {
  const { width, height, fill } = props;
  const ratio = !fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined;
  return <Image alt={alt} {...props} style={ratio ? { ...ratio, ...style } : style} />;
}
