'use client';
import YouTube from 'react-youtube';

const VideoPlayer = ({ youtubeId }) => {
  const options = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
    },
  };

  return (
    <div className="w-full h-full">
      <YouTube
        videoId={youtubeId}
        opts={options}
        className="w-full h-full"
        onError={() => alert("Video gagal dimuat. Silakan coba lagi.")}
      />
    </div>
  );
};

export default VideoPlayer;
