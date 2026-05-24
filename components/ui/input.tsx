import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suppressHydrationWarning = true, ...props }, ref) => {
    return (
      <input
        type={type}
        suppressHydrationWarning={suppressHydrationWarning}
        className={cn(
          "flex h-12 w-full rounded-md border border-white/10 bg-white/6 px-4 text-sm text-white shadow-sm transition placeholder:text-zinc-500 focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
