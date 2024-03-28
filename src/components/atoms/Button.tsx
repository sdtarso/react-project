import { PropsWithChildren } from "react";

interface IButton {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function Button({
  children,
  className,
  disabled = false,
  ...props
}: PropsWithChildren<IButton>) {
  return (
    <button
      className={`border bg-neutral-500 rounded px-4 py-3 text-white ${className} ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
