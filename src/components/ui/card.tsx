
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  variant?: "default" | "outline" | "ghost" | "model";
}

export function Card({
  children,
  className,
  title,
  subtitle,
  isLoading = false,
  variant = "default",
}: CardProps) {
  const variantStyles = {
    default: "bg-card border border-border shadow-sm",
    outline: "border border-border bg-transparent",
    ghost: "border-none bg-transparent shadow-none",
    model: "overflow-hidden bg-gradient-to-br from-primary/5 to-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300"
  };

  return (
    <div
      className={cn(
        "card overflow-hidden animate-scale-in rounded-lg",
        variantStyles[variant],
        isLoading ? "opacity-70" : "",
        className
      )}
    >
      {(title || subtitle) && (
        <div className="p-4 border-b border-border">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("p-4 pt-0", className)}>{children}</div>;
}

export function CardFooter({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex items-center p-4 pt-0", className)}>
      {children}
    </div>
  );
}
