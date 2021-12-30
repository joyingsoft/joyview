/**
 * https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
 * @param contentType : e.g. Blob.type
 */
export const isMediaTypeImage = (contentType?: string): boolean =>
  !!contentType && contentType.toLowerCase().trimStart().startsWith('image');

/**
 * get file path (and name).
 * this value should be unique, and can be used as a key.
 * @param file
 */
export const getFilePathName = (file: File) =>
  `${file.webkitRelativePath}${
    file.webkitRelativePath.includes(file.name) ? '' : file.name
  }`;
