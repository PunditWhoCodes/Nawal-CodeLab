import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

const VideoPlayer = ({ videoUrl, onProgress, onError }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const iframeRef = useRef(null)

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }
    return null
  }

  const videoId = getYouTubeVideoId(videoUrl)

  // Create proper embed URL with all necessary parameters
  const createEmbedUrl = (videoId) => {
    if (!videoId) return null
    
    const params = new URLSearchParams({
      enablejsapi: '1',
      origin: window.location.origin,
      rel: '0',
      modestbranding: '1',
      showinfo: '0',
      controls: '1',
      autoplay: '0',
      fs: '1',
      cc_load_policy: '0',
      iv_load_policy: '3',
      autohide: '1'
    })
    
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
  }

  const embedUrl = createEmbedUrl(videoId)

  useEffect(() => {
    setVideoError(false)
    
    // Reset iframe when video changes
    if (iframeRef.current) {
      iframeRef.current.src = embedUrl
    }
  }, [videoUrl, embedUrl])

  const handleIframeLoad = () => {
    // Check if iframe loaded successfully
    setTimeout(() => {
      try {
        if (iframeRef.current) {
          const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document
          if (!iframeDoc) {
            // If we can't access the iframe content, it likely loaded successfully
            setVideoError(false)
          }
        }
      } catch (error) {
        // Cross-origin restrictions are normal for YouTube embeds
        setVideoError(false)
      }
    }, 1000)
  }

  const handleIframeError = () => {
    console.error('Video embedding failed')
    setVideoError(true)
    if (onError) onError('Video embedding failed')
  }

  // Simulate progress for embedded videos
  useEffect(() => {
    if (!videoError && isPlaying && onProgress) {
      const interval = setInterval(() => {
        // Simulate progress - in a real app, you'd get this from the YouTube API
        onProgress(prev => Math.min(prev + 1, 100))
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [isPlaying, videoError, onProgress])

  if (!videoUrl || !videoId) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <Play size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Video Available</h3>
          <p className="text-gray-300">
            This lesson doesn't have a video yet.
          </p>
        </div>
      </div>
    )
  }

  if (videoError) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <Play size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Video Temporarily Unavailable</h3>
          <p className="text-gray-300 mb-4">
            We're working to resolve this issue. Please try again later.
          </p>
          <button
            onClick={() => {
              setVideoError(false)
              if (iframeRef.current) {
                iframeRef.current.src = embedUrl
              }
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-black">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title="Course Video"
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sandbox="allow-scripts allow-same-origin allow-presentation"
      />
    </div>
  )
}

export default VideoPlayer