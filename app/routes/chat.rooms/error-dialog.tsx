import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export default function ErrorDialog({
  title,
  msg,
  onClose,
}: {
  title: string;
  msg: string;
  onClose: () => void;
}) {
  return (
    <AlertDialog
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent className="border-red-600 bg-red-600/[0.9] dark:bg-red-950/[0.9]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-200">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-200">
            {msg}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
