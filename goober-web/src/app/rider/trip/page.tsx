'use client'

import { Button } from '@/components/Button'
import MapCustom from '@/components/Map'
import DriverPin from '@/components/Map/DriverPin'
import PersonalPin from '@/components/Map/PersonalPin'
import { api } from '@/data/api'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Layer, Marker, Source } from 'react-map-gl'

export default function RiderConfirm() {
  const router = useRouter()
  const [tripId, setTripId] = useState('')
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(
    null,
  )
  const [pickup, setPickup] = useState<[number, number]>([0, 0])
  const [routeCoordinates, setRouteCoordinates] = useState<[[number, number]]>([
    [0, 0],
  ])
  const [rideDuration, setRideDuration] = useState(0)

  const handleCancel = useCallback(() => {
    api(`/trips/cancel/${tripId}`)

    router.push('/rider')
  }, [router, tripId])

  const handleFindDriver = useCallback(() => {
    api(`/trips/available/${localStorage.getItem('@goober-yuri:passenger')}`)
      .then((response) => response.json())
      .then(({ trip }) => {
        if (trip.status !== 'AWAITING') {
          const passengerLocation = trip.startPoint
            .split(',')
            .map((p: string) => Number(p))

          const driverLocation: [number, number] = [
            passengerLocation[0] - 0.00402,
            passengerLocation[1] - 0.003023,
          ]

          setDriverLocation(driverLocation)

          const url =
            `https://api.mapbox.com/directions/v5/mapbox/driving/${driverLocation.toString()};${trip.startPoint}?` +
            'geometries=geojson&' +
            new URLSearchParams({
              access_token:
                'pk.eyJ1IjoieXVyaXBhbGFjaW8iLCJhIjoiY2xvcjhtaTk0MG9qODJqcXExYzlkNnZzMSJ9.1Y5eNIbaajikilUksaEaJg',
            })
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data.routes[0]) {
                setRouteCoordinates(data.routes[0].geometry.coordinates)
                setRideDuration(data.routes[0].duration / 100)
              }
            })
        }
      })
  }, [])

  useEffect(() => {
    api(`/trips/available/${localStorage.getItem('@goober-yuri:passenger')}`)
      .then((response) => response.json())
      .then(({ trip }) => {
        setTripId(trip.id)
        setPickup(trip.startPoint.split(',').map((p: string) => Number(p)))
      })
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <div className="absolute left-4 top-4 z-10 cursor-pointer rounded-full bg-white shadow-md">
        <Button onClick={handleFindDriver}>Find a driver</Button>
      </div>
      <MapCustom
        baseCoordinates={{ longitude: pickup[0], latitude: pickup[1] }}
        customBounds={[pickup, driverLocation || pickup]}
      >
        <Marker
          key="driverLocation"
          latitude={pickup[1]}
          longitude={pickup[0]}
          anchor="bottom"
        >
          <PersonalPin size={40} />
        </Marker>
        {driverLocation && (
          <>
            <Marker
              key="destinationLocation"
              latitude={driverLocation[1]}
              longitude={driverLocation[0]}
              anchor="bottom"
            >
              <DriverPin size={60} />
            </Marker>
            <Source
              type="geojson"
              data={{
                type: 'LineString',
                coordinates: routeCoordinates,
              }}
            >
              <Layer
                id="lineLayer"
                type="line"
                source="my-data"
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': 'rgba(3, 170, 238, 0.5)',
                  'line-width': 5,
                }}
              />
            </Source>
          </>
        )}
      </MapCustom>
      <div className="flex h-1/3 flex-col items-center justify-between p-2">
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          {driverLocation ? (
            <div className="flex w-full items-center px-2 py-4">
              <Image
                src="/car.png"
                width={100}
                height={100}
                alt="Driver image"
              />
              <div className="flex flex-1 flex-col">
                <span className="text-xs text-indigo-500 ">Tesla Model S</span>
                <span className="text-lg">FXO-3364</span>
                <span className="mt-2 font-medium">Yuri Fortunato Palacio</span>
                <span className="text-sm text-indigo-500">
                  {rideDuration.toFixed(0)} min away
                </span>
              </div>
            </div>
          ) : (
            <span className="text-lg text-indigo-400">
              Searching for a driver...
            </span>
          )}
        </div>

        <Button className="w-full py-4" onClick={handleCancel}>
          Cancel Goober
        </Button>
      </div>
    </div>
  )
}
