/**
 * https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
 */
export const resizeImageTypes = [
  'image/png',
  'image/jpeg',
  'image/webp',
] as const;

export const isDefinedResizeType = (imgType: string) =>
  (resizeImageTypes as unknown as string[]).includes(
    imgType.trim().toLowerCase(),
  );

export const createCanvas = (
  image: CanvasImageSource,
  drawWidth: number,
  drawHeight: number,
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = drawWidth;
  canvas.height = drawHeight;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(image, 0, 0, drawWidth, drawHeight);
    return canvas;
  } else {
    throw new Error('An error has occurred!');
  }
};

export const createCanvasFromImg = (
  image: HTMLImageElement,
  maxWidth: number = 1000,
  maxHeight: number = 1000,
): HTMLCanvasElement => {
  let width = image.width;
  let height = image.height;
  if (image.width === image.height) {
    const minMax = maxHeight > maxWidth ? maxWidth : maxHeight;
    width = height = image.width > minMax ? minMax : image.width;
  } else if (image.width > image.height && image.width > maxWidth) {
    width = maxWidth;
    height = (maxWidth / image.width) * image.height;
  } else if (image.height > image.width && image.height > maxHeight) {
    height = maxHeight;
    width = (maxHeight / image.height) * image.width;
  }
  return createCanvas(image, width, height);
};

export const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

/**
 * @type A DOMString indicating the image format.
 * The default type is image/png;
 * this image format will be also used if the specified type is not supported.
 * @quality A Number between 0 and 1 indicating the image quality to be used
 * when creating images using file formats that support lossy compression
 * (such as image/jpeg or image/webp).
 * A user agent will use its default quality value if this option is not
 * specified, or if the number is outside the allowed range.
 * @returns A DOMString containing the requested data URI.
 * If the height or width of the canvas is 0 or larger than the maximum
 * canvas size, the string "data:," is returned.
 */
export const canvasToDataURL = (
  canvas: HTMLCanvasElement,
  type?: string,
  quality = 0.75,
) => {
  return canvas.toDataURL(type, quality);
};

/**
 * @see {canvasToDataURL}
 */
export const getResizedDataURL = (
  img: HTMLImageElement,
  maxWidth?: number,
  maxHeight?: number,
) => {
  return canvasToDataURL(createCanvasFromImg(img, maxWidth, maxHeight));
};
