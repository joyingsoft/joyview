/**
 * https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
 * @param contentType : e.g. Blob.type
 */
export const isMediaTypeImage = (contentType?: string): boolean =>
  !!contentType && contentType.toLowerCase().trimStart().startsWith('image');
