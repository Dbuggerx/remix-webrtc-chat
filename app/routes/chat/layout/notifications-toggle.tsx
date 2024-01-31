import { BellRing, Bell } from "lucide-react";
import { Button } from "~/components/ui/button";

type Props = {
  onToggleNotifications: () => void;
  notificationsEnabled: boolean;
};

export default function NotificationsToggle({
  onToggleNotifications,
  notificationsEnabled,
}: Props) {
  return (
    <Button
      className="ml-auto h-8 w-8"
      size="icon"
      variant="outline"
      onClick={onToggleNotifications}
    >
      {notificationsEnabled ? (
        <BellRing className="h-4 w-4" />
      ) : (
        <Bell className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle notifications</span>
    </Button>
  );
}
