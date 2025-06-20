import { trimExtension } from '../../utils/file-utils';

type Props = {
  file: File;
};
export function FileImg({ file }: Props) {
  const dataURL = URL.createObjectURL(file);
  const name = trimExtension(file.name);

  return (
    <>
      <div className="info ">
        <span className="name">{name}</span>
        <span className="size">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>
      </div>
      <img src={dataURL} alt={name} title={name} />
    </>
  );
}
