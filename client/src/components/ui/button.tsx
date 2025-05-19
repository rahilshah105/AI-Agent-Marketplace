import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

/* ------------------------------------------------------------------ */
/* A super-lite `clsx` helper (string | false | undefined → string)   */
/* ------------------------------------------------------------------ */
function clsx(...inputs: unknown[]) {
  return inputs.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* Utility maps for variants / sizes                                  */
/* ------------------------------------------------------------------ */
const VARIANT = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
} as const;

const SIZE = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
} as const;

type Variant = keyof typeof VARIANT;
type Size = keyof typeof SIZE;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** visual style – maps to `VARIANT` */
  variant?: Variant;
  /** height / padding – maps to `SIZE`   */
  size?: Size;
  /** render as `<Slot>` (Radix) instead of a `<button>` */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={clsx(
          /* base styles */
          "inline-flex items-center justify-center gap-2 whitespace-nowrap",
          "rounded-md text-sm font-medium transition-colors ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          /* variant + size */
          VARIANT[variant],
          SIZE[size],
          /* consumer-supplied classes */
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
