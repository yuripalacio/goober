'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Map, { MapRef } from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project'
import 'mapbox-gl/dist/mapbox-gl.css'

interface MapProps {
  baseCoordinates: {
    longitude: number
    latitude: number
  }
  customBounds?: [[number, number], [number, number]]
  children?: React.ReactNode
}

export default function MapCustom({
  baseCoordinates,
  customBounds,
  children,
}: MapProps) {
  const mapRef = useRef<MapRef>(null)

  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [zoom, setZoom] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const viewport = useMemo(() => {
    return new WebMercatorViewport({
      width: 375,
      height: 667,
    })
  }, [])

  useEffect(() => {
    if (customBounds) {
      const bounds = viewport.fitBounds(customBounds, { padding: 65 })

      setLongitude(bounds.longitude)
      setLatitude(bounds.latitude)
      setZoom(bounds.zoom)
      mapRef.current?.flyTo({
        center: [bounds.longitude, bounds.latitude],
        duration: 1500,
        zoom: bounds.zoom,
      })
    } else {
      setLongitude(baseCoordinates.longitude)
      setLatitude(baseCoordinates.latitude)
    }

    setIsLoading(false)
  }, [customBounds, baseCoordinates, viewport])

  return (
    <>
      {isLoading ? (
        <h1>Carregando</h1>
      ) : (
        <Map
          ref={mapRef}
          mapboxAccessToken="pk.eyJ1IjoieXVyaXBhbGFjaW8iLCJhIjoiY2xvcjhtaTk0MG9qODJqcXExYzlkNnZzMSJ9.1Y5eNIbaajikilUksaEaJg"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          initialViewState={{
            latitude,
            longitude,
            zoom,
          }}
          maxZoom={17}
          minZoom={3}
        >
          {children}
        </Map>
      )}
    </>
  )
}
