import { cn } from "@/lib/utils";

interface PageWrapperProps extends React.ComponentProps<"div"> {}

export function PageWrapper({ className, children, ...props }: PageWrapperProps) {
  return (
    <div
      className={cn("min-h-[calc(100svh-100px)]", className)}
      {...props}
    >
      {children}
    </div>
  );
}