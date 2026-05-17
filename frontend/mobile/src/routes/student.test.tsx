import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/student/test")({
  component: TestLayout,
});

function TestLayout() {
  return <Outlet />;
}
