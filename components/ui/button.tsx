import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-500 text-emerald-950 shadow-glow hover:bg-emerald-400",
        secondary:
          "border border-white/10 bg-white/6 text-white hover:border-emerald-400/50 hover:bg-emerald-400/10",
        ghost: "text-zinc-300 hover:bg-white/7 hover:text-white",
        outline:
          "border border-emerald-400/40 bg-transparent text-emerald-200 hover:bg-emerald-400/10"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 px-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      suppressHydrationWarning = true,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        suppressHydrationWarning={suppressHydrationWarning}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
