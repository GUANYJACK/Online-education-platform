import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/student/progress")({
  component: ProgressLayout,
});

function ProgressLayout() {
  return <Outlet />;
}
