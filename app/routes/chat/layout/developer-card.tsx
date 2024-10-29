import { Github, Linkedin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export default function DeveloperCard() {
  return (
    <Card className="border-0 bg-inherit text-center @xxs:border @xxs:bg-card @xxs:text-left">
      <CardHeader className="pb-0">
        <CardDescription className="hidden flex-col space-y-1.5 @xxs:flex">
          Developed by <br />
          <strong>Danilo Cestari</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="inline-flex flex-col gap-2 p-0 pt-0 @xxs:flex-row @xxs:p-6">
        <Button
          className="ml-auto h-8 w-8"
          size="icon"
          variant="outline"
          title="LinkedIn"
          asChild
        >
          <a
            href="https://www.linkedin.com/in/danilocestari"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </Button>
        <Button
          className="ml-auto h-8 w-8"
          size="icon"
          variant="outline"
          title="Github"
          asChild
        >
          <a
            href="https://github.com/Dbuggerx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
