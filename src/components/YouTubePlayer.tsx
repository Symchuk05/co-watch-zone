import { useState, useEffect, useRef } from "react";

interface YouTubePlayerProps {
  videoId: string;
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (time: number) => void;
  isPlaying?: boolean;
  currentTime?: number;
  syncFromExternal?: boolean;
}

const YouTubePlayer = ({ 
  videoId, 
  onPlay, 
  onPause, 
  onTimeUpdate, 
  isPlaying = false,
  currentTime = 0,
  syncFromExternal = false
}: YouTubePlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      const newPlayer = new window.YT.Player(iframeRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
          fs: 1,
          cc_load_policy: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: () => {
            setIsReady(true);
            setPlayer(newPlayer);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING && onPlay) {
              onPlay();
            } else if (event.data === window.YT.PlayerState.PAUSED && onPause) {
              onPause();
            }
          }
        }
      });
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId]);

  // Update time periodically
  useEffect(() => {
    if (!player || !isReady) return;

    const interval = setInterval(() => {
      if (player.getCurrentTime && onTimeUpdate) {
        onTimeUpdate(player.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, isReady, onTimeUpdate]);

  // Sync external controls
  useEffect(() => {
    if (!player || !isReady || !syncFromExternal) return;

    if (isPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }, [player, isReady, isPlaying, syncFromExternal]);

  // Sync time
  useEffect(() => {
    if (!player || !isReady || !syncFromExternal) return;

    const playerTime = player.getCurrentTime();
    if (Math.abs(playerTime - currentTime) > 2) {
      player.seekTo(currentTime, true);
    }
  }, [player, isReady, currentTime, syncFromExternal]);

  return (
    <div className="w-full h-full relative">
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

// Add YouTube API types to window
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default YouTubePlayer;