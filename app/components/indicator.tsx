import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("inline-flex h-2 w-2 rounded-full", {
  variants: {
    variant: {
      green: "bg-green-500",
      red: "bg-red-500",
      grey: "bg-gray-500",
    },
  },
  defaultVariants: {
    variant: "grey",
  },
});

type Props = VariantProps<typeof variants> & {
  text?: string;
};

export default function Indicator({ variant, text }: Props) {
  return (
    <>
      <span className={variants({ variant })} />
      {text ? <span className="ml-1">{text}</span> : null}
    </>
  );
}
