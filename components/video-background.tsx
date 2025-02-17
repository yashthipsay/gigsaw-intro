// components/video-background.tsx
"use client"

import { useEffect, useRef } from 'react'

export function VideoBackground({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoUrl = "https://gigsaw.s3.eu-north-1.amazonaws.com/site-header.mp4"

  useEffect(() => {
    // Preload video
    if (videoRef.current) {
      videoRef.current.load()
    }

    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.removeAttribute('src')
        videoRef.current.load()
      }
    }
  }, [])

  return (
    <>
      {/* Add preload hint with crossOrigin */}
      <link 
        rel="preload" 
        as="video" 
        href={videoUrl} 
        type="video/mp4"
        crossOrigin="anonymous"
      />
      
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-[120%] md:w-full min-h-screen object-cover ${className}`}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video element.
      </video>
    </>
  )
}