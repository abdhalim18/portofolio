import type { ElementType, ReactNode } from 'react';

type MenuBoxProps = {
  as?: ElementType;
  /** Label kecil di pojok kiri atas, mis. "STATUS" atau "MAGIC". */
  title?: string;
  glass?: boolean;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>;

/** Jendela menu biru klasik. Semua section memakai komponen ini. */
export default function MenuBox({ as: Tag = 'div', title, glass, className = '', children, ...rest }: MenuBoxProps) {
  return (
    <Tag className={`ff-box ${glass ? 'ff-box--glass' : ''} ${className}`} {...rest}>
      {title ? <p className="ff-label mb-3">{title}</p> : null}
      {children}
    </Tag>
  );
}
