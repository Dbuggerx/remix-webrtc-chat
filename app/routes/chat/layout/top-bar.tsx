import { cva, VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const variants = cva(
  "flex h-14 w-full items-center border-b px-4 dark:border-slate-700",
  {
    variants: {
      content: { centered: "justify-center" },
    },
   
  },
);

type Props = { children: React.ReactNode } & VariantProps<typeof variants>;

export default function TopBar({ children, content }: Props) {
  return <header className={cn(variants({ content }))}>{children}</header>;
}
