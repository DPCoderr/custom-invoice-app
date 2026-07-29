// components/layout/section.tsx
import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {}

export function SectionWrapper({ className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn("container mx-auto max-w-7xl px-4 py-10", className)}
      {...props}
    >
      {children}
    </section>
  );
}