import { FrownIcon } from "lucide-react";

export default function ErrorBoundary() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4">
        <FrownIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Oops, something went wrong!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          We&apos;re sorry, but something went wrong. Please try again later.
        </p>
      </div>
    </div>
  );
}
