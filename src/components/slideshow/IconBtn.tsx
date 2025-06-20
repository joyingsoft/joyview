import { Icon } from '@iconify/react/dist/iconify.js';

export function IconBtn({
  icon,
  onClick,
  className,
}: {
  icon: string;
  onClick: () => void;
  className: string;
}) {
  return (
    <div className={`action p-lg ${className}`} role="button" onClick={onClick}>
      <Icon icon={icon} className="icon icon-lg" />
    </div>
  );
}
