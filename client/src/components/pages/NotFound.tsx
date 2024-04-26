import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[66vh] gap-2 text-center">
      <div className="flex items-center justify-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            404 Not Found
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Sorry, we couldn't find the page you were looking for.
          </p>
        </div>
      </div>
      <a
        className="inline-flex items-center gap-2 text-base font-medium translate-y-2 underline-anim"
        href="/"
      >
        <span>Go Back</span>
        <span className="inline-block translate-y-[-1px]">
          <ArrowRightIcon className="w-4 h-4" />
        </span>
      </a>
    </div>
  );
}
