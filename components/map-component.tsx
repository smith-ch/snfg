"use client"

import { useState, useEffect } from "react"

interface MapComponentProps {
  address?: string
  zoom?: number
  height?: string
}

export default function MapComponent({
  address = "123 Calle Principal, Ciudad, País",
  zoom = 15,
  height = "400px",
}: MapComponentProps) {
  const [mapLoaded, setMapLoaded] = useState(false)

  // Encode the address for the URL
  const encodedAddress = encodeURIComponent(address)

  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}&zoom=${zoom}`

  // For demo purposes, we'll use a static map from Google Maps
  const staticMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d-79.9191156!3d-2.1705376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMTAnMTMuOSJTIDc5wrA1NScwOC44Ilc!5e0!3m2!1ses!2sec!4v1616593299000!5m2!1ses!2sec`

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full" style={{ height }}>
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        <iframe
          src={staticMapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className={`${mapLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
          onLoad={() => setMapLoaded(true)}
          title="Ubicación de SNG SERVIMAX"
        ></iframe>
      </div>
    </div>
  )
}

