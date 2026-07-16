import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { HlsPlayer } from "@/components/HlsPlayer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CCTV RT 01 RW VIII" },
      { name: "description", content: "Live CCTV streaming wilayah RT 01 RW VIII" },
    ],
  }),
  component: Index,
});

const CAMERAS = [
  {
    id: "rt2",
    name: "CCTV - Wilayah RT 2",
    src: "https://livepantau.semarangkota.go.id/67b6b31a-7dfd-4edb-873e-57c3c5fb5d02/video1_stream.m3u8",
  },
  {
    id: "badminton",
    name: "CCTV - Badminton",
    src: "https://livepantau.semarangkota.go.id/c6f87fcc-799c-4ec7-a650-e6f4fec64124/video1_stream.m3u8",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 px-6 py-5">
        <h1 className="text-2xl font-semibold">CCTV Security</h1>
        <p className="text-sm text-slate-400">Live streaming kamera lingkungan</p>
      </header>
      <main className="mx-auto grid max-w-6xl gap-6 p-6 md:grid-cols-2">
        {CAMERAS.map((cam) => (
          <section
            key={cam.id}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-medium">{cam.name}</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-medium text-red-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                LIVE
              </span>
            </div>
            <ClientOnly
              fallback={
                <div className="aspect-video w-full animate-pulse rounded-lg bg-slate-800" />
              }
            >
              {() => <HlsPlayer src={cam.src} />}
            </ClientOnly>
          </section>
        ))}
      </main>
    </div>
  );
}
