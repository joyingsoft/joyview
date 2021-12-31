/**
 * https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
 * @param contentType : e.g. Blob.type
 */
export const isMediaTypeImage = (contentType?: string): boolean =>
  !!contentType && contentType.toLowerCase().trimStart().startsWith('image');

/**
 * Get filename without .extension.
 * trim/remove extension from filename
 * @param filename: string
 */
export const trimExtension = (filename?: string) => {
  return filename?.replace(/\.[^/.]+$/, '') || '';
};

/**
 * get file path (and name).
 * this value should be unique, and can be used as a key.
 * default file .extension will be removed.
 * @param file: File
 */
export const getFilePathName = (file: File, noExtension = true) => {
  const name = `${file.webkitRelativePath}${
    file.webkitRelativePath.includes(file.name) ? '' : file.name
  }`;
  return noExtension ? trimExtension(name) : name;
};
