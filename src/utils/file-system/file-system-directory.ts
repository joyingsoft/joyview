// const addFilesFromDirectory = async (
//   files: FileSystemFileHandle[],
//   dirHandle: Promise<FileSystemDirectoryHandle>,
// ) => {
//   for await (const [name, handler] of (await dirHandle).entries()) {
//     if (handler.kind === 'directory') {
//       files = files.concat(
//         await addFilesFromDirectory(files, handler.getDirectoryHandle(name)),
//       );
//     } else if (handler.kind === 'file') {
//       files.push(handler);
//     }
//   }

//   return files;
// };

// export const getDirectoryFiles = async (
//   dirHandle: Promise<FileSystemDirectoryHandle>,
// ): Promise<FileSystemFileHandle[]> => {
//   return addFilesFromDirectory([], dirHandle);
// };

const addFilesFromDirectory = async (
  files: string[],
  dirHandle: FileSystemDirectoryHandle,
) => {
  for await (const [name, handler] of (await dirHandle).entries()) {
    if (handler.kind === 'file') {
      files.push(name);
    } else if (handler.kind === 'directory') {
      const x = await handler.getDirectoryHandle(name, { create: true });
      files = files.concat(await addFilesFromDirectory(files, x));
    }
  }

  return files;
};

export const getDirectoryFiles = async (
  dirHandle: FileSystemDirectoryHandle,
): Promise<string[]> => {
  return addFilesFromDirectory([], dirHandle);
};
