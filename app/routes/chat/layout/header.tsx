import UserMenu from "./user-menu";
import { ThemeModeToggle } from "~/components/theme-mode-toggle";
import Breadcrumbs from "./breadcrumbs";
import { KeyRound } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";

type Props = React.ComponentProps<typeof Breadcrumbs> &
  React.ComponentProps<typeof UserMenu>;

export default function Header({ username, currentLocation, matches }: Props) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-4 dark:bg-gray-800/40 lg:h-[60px]">
      <Breadcrumbs currentLocation={currentLocation} matches={matches} />
      <section className="w-full flex-1">
        <ThemeModeToggle />
      </section>
      {username ? (
        <UserMenu username={username} />
      ) : (
        <Button variant="ghost" asChild>
          <Link to="/login">
            <KeyRound className="mr-2" /> Login
          </Link>
        </Button>
      )}
    </header>
  );
}
