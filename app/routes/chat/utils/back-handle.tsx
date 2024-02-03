import { ArrowLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { createHandleValidator } from "~/utils/handles";

export const getTitleWithBackButton = (label: string) => ({
  titleWithBackButton: () => (
    <>
      <Button size="icon" variant="ghost">
        <ArrowLeftIcon className="size-6" />
      </Button>
      <span className="select-none font-bold">{label}</span>
    </>
  ),
});

export const hasTitleWithBackButtonHandle = createHandleValidator<
  ReturnType<typeof getTitleWithBackButton>
>("titleWithBackButton");
