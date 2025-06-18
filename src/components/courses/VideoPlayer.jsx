import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, ExternalLink } from 'lucide-react'

const VideoPlayer = ({ videoUrl, onProgress, onError }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const iframeRef = useRef(null)

  // Extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url?.match(regex)
    return match ? match[1] : null
  }

  const videoId = getYouTubeVideoId(videoUrl)
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}&rel=0&modestbranding=1&showinfo=0&controls=1` : null

  const handleIframeError = () => {
    setShowFallback(true)
    if (onError) onError('Video cannot be embedded')
  }

  const openInYouTube = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank')
    }
  }

  useEffect(() => {
    // Reset fallback when video changes
    setShowFallback(false)
  }, [videoUrl])

  if (!videoUrl || !videoId || showFallback) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <Play size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Video Not Available</h3>
          <p className="text-gray-300 mb-4">
            This video cannot be embedded. Click below to watch on YouTube.
          </p>
          <button
            onClick={openInYouTube}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ExternalLink size={16} className="mr-2" />
            Watch on YouTube
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title="Course Video"
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onError={handleIframeError}
        onLoad={() => {
          // Check if iframe loaded successfully
          try {
            if (iframeRef.current && !iframeRef.current.contentDocument) {
              // If we can't access contentDocument, it might be blocked
              setTimeout(() => setShowFallback(true), 2000)
            }
          } catch (error) {
            console.log('Iframe access blocked, showing fallback')
            setShowFallback(true)
          }
        }}
      />
      
      {/* Fallback button overlay */}
      <div className="absolute top-4 right-4">
        <button
          onClick={openInYouTube}
          className="bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70 transition-all"
          title="Open in YouTube"
        >
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer