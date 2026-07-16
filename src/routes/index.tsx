import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RT 01 RW VIII — CCTV & Info Warga" },
      { name: "description", content: "Portal warga RT 01 RW VIII dengan live CCTV" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/app.html"
      title="RT 01 RW VIII"
      className="fixed inset-0 h-screen w-screen border-0"
    />
  );
}
