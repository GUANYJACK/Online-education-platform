import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/student/learn")({
  component: LearnLayout,
});

function LearnLayout() {
  return <Outlet />;
}
