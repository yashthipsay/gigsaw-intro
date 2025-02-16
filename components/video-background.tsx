"use client"

export function VideoBackground({ className }: { className?: string }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={`fixed top-0 left-0 w-screen min-h-screen object-cover ${className}`}
    >
      <source src="/site-header.mp4" type="video/mp4" />
      Your browser does not support the video element.
    </video>
  )
}