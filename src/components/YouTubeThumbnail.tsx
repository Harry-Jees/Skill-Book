import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface YouTubeThumbnailProps {
  url: string;
  index: number;
}

const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
};

const isSearchUrl = (url: string) => url.includes("youtube.com/results");

const getSearchQuery = (url: string) => {
  try {
    const params = new URL(url).searchParams;
    return params.get("search_query") || "";
  } catch {
    return decodeURIComponent(url.split("search_query=")[1] || "");
  }
};

const YouTubeThumbnail = ({ url, index }: YouTubeThumbnailProps) => {
  const videoId = extractVideoId(url);
  const isSearch = isSearchUrl(url);
  const [imgError, setImgError] = useState(false);

  // For direct video URLs, show thumbnail with fallback
  if (videoId && !imgError) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl overflow-hidden border border-border hover:border-secondary/40 transition-all hover:-translate-y-0.5 shadow-card hover:shadow-card-hover"
      >
        <div className="relative aspect-video bg-muted">
          <img
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
            alt={`Video ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
        <div className="px-3 py-2 bg-card">
          <p className="text-xs font-body font-medium text-foreground/80 truncate">▶ Video {index + 1}</p>
        </div>
      </a>
    );
  }

  if (isSearch) {
    const query = getSearchQuery(url);
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl overflow-hidden border border-border hover:border-red-500/40 transition-all hover:-translate-y-0.5 shadow-card hover:shadow-card-hover"
      >
        <div className="relative aspect-video bg-gradient-to-br from-red-500/10 to-red-600/5 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
            <p className="text-xs font-body text-muted-foreground line-clamp-2">{query.slice(0, 60)}</p>
          </div>
        </div>
        <div className="px-3 py-2 bg-card flex items-center justify-between">
          <p className="text-xs font-body font-medium text-foreground/80 truncate">🔍 Search YouTube</p>
          <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
        </div>
      </a>
    );
  }

  // Fallback for broken or unknown URLs — redirect to YouTube search
  const fallbackSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent("tutorial video " + (index + 1))}`;
  return (
    <a
      href={url.startsWith("http") ? url : fallbackSearchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-xs font-body font-medium text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
    >
      ▶ Video {index + 1}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
};

export default YouTubeThumbnail;
