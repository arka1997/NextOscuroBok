import React from 'react';

interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ComponentType;
  isActive?: boolean;
  color?: string;
  children?: React.ReactNode;
}

export function IconBtn({ Icon, isActive = false, color, children, ...props }: IconBtnProps) {
  return (
    <button
      className={`btn icon-btn ${isActive ? "icon-btn-active" : ""}`}
      style={{ color: color }}
      {...props}
    >
      <span className={`${children != null ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}