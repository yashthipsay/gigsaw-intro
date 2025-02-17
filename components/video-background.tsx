"use client"

export function VideoBackground({ className }: { className?: string }) {
  const videoUrl = "https://gigsaw.s3.eu-north-1.amazonaws.com/site-header.mp4";
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={`fixed top-0 left-0 w-screen min-h-screen object-cover video-background ${className}`}
    >
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video element.
    </video>
  )
}