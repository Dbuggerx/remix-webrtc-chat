import { Link } from "@remix-run/react";
import { KeyRound } from "lucide-react";
import UserMenu from "./user-menu";
import { ThemeModeToggle } from "~/components/theme-mode-toggle";
import { Button } from "~/components/ui/button";
import Breadcrumbs from "./breadcrumbs";
import TopBar from "./top-bar";

type Props = React.ComponentProps<typeof Breadcrumbs> &
  React.ComponentProps<typeof UserMenu>;

export default function Header({ username, currentLocation, matches }: Props) {
  return (
    <TopBar>
      <Breadcrumbs currentLocation={currentLocation} matches={matches} />
      <section className="flex-auto">
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
    </TopBar>
  );
}
