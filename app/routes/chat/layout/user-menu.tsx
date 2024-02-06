import { User } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function UserMenu({ username }: { username: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="px-2" variant="ghost">
          <User />
          <span className="hidden sm:inline">{username}</span>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <form action="/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
