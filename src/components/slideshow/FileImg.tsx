import { trimExtension } from '../../utils/file-utils';

type Props = {
  file: File;
};
export function FileImg({ file }: Props) {
  const dataURL = URL.createObjectURL(file);
  return <img src={dataURL} alt={trimExtension(file?.name)} />;
}
