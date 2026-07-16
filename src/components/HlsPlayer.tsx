import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

type Props = {
  src: string;
  poster?: string;
};

export function HlsPlayer({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setError(null);

    let hls: Hls | null = null;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_e, data) => {
        if (data.fatal) setError("Stream tidak dapat dimuat");
      });
    } else {
      setError("Browser tidak mendukung HLS");
    }

    return () => {
      if (hls) hls.destroy();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        poster={poster}
        controls
        autoPlay
        muted
        playsInline
        className="h-full w-full object-contain"
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-sm text-white">
          {error}
        </div>
      )}
    </div>
  );
}