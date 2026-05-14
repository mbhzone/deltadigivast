import React from 'react';

const VideoSection = () => {
  return (
    <section className=" text-center">
      <div className="relative w-full container mx-auto">
        <video
          className="w-full md:rounded-md shadow-lg"
          src="/videos/hero-video.mp4"
          autoPlay
          muted
          loop
          controls
        />
      </div>
    </section>
  );
};

export default VideoSection;
