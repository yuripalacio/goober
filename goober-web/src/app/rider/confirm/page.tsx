'use client'

import { Button } from '@/components/Button'
import MapCustom from '@/components/Map'
import DestinationPin from '@/components/Map/DestinationPin'
import PersonalPin from '@/components/Map/PersonalPin'
import { api } from '@/data/api'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Layer, Marker, Source } from 'react-map-gl'

type Coordinates = [number, number]

export default function RiderConfirm() {
  const router = useRouter()
  const valueCoefficient = 0.87
  const [routeCoordinates, setRouteCoordinates] = useState<[Coordinates]>([
    [0, 0],
  ])
  const [pickupCoordinates, setPickupCoordinates] = useState<Coordinates>([
    0, 0,
  ])
  const [dropoffCoordinates, setDropoffCoordinates] = useState<Coordinates>([
    0, 0,
  ])
  const [rideDuration, setRideDuration] = useState(0)

  const riderParams = useSearchParams()

  useEffect(() => {
    if (riderParams && riderParams.get('dropoff')) {
      const dropoff: Coordinates = riderParams
        .get('dropoff')
        .split(',')
        .map((d) => Number(d)) as Coordinates

      setDropoffCoordinates(dropoff)
    }

    if (riderParams && riderParams.get('pickup')) {
      const pickUp: Coordinates = riderParams
        .get('pickup')
        .split(',')
        .map((d) => Number(d)) as Coordinates
      setPickupCoordinates(pickUp)
    }
  }, [riderParams])

  useEffect(() => {
    const url =
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates.join(
        ',',
      )};${dropoffCoordinates.join(',')}?` +
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
  }, [pickupCoordinates, dropoffCoordinates])

  async function handleConfirm() {
    await api('/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passengerId: localStorage.getItem('@goober-yuri:passenger'),
        startPoint: pickupCoordinates.toString(),
        destination: dropoffCoordinates.toString(),
      }),
    })

    router.push('/rider/trip')
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="absolute left-4 top-4 z-10 cursor-pointer rounded-full bg-white shadow-md">
        <Link href="/rider">
          <ArrowLeft className="m-2" />
        </Link>
      </div>
      <MapCustom
        baseCoordinates={{
          longitude: pickupCoordinates[0],
          latitude: pickupCoordinates[1],
          // longitude: -46.559583,
          // latitude: -23.6417375,
        }}
        customBounds={[pickupCoordinates, dropoffCoordinates]}
        // pickupCoordinates={[-122.483696, 37.833818]}
        // dropoffCoordinates={[-122.493782, 37.833683]}
      >
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
        <Marker
          key="driverLocation"
          latitude={pickupCoordinates[1]}
          longitude={pickupCoordinates[0]}
          anchor="bottom"
        >
          <PersonalPin size={40} />
        </Marker>
        <Marker
          key="destinationLocation"
          latitude={dropoffCoordinates[1]}
          longitude={dropoffCoordinates[0]}
          anchor="bottom"
        >
          <DestinationPin size={40} />
        </Marker>
      </MapCustom>
      <div className="flex h-1/2 flex-1 flex-col">
        <div className="flex flex-1 flex-col overflow-y-scroll border-b">
          <div className="flex items-center p-4">
            <Image
              src="/car.png"
              width={100}
              height={100}
              alt="Goober Car image"
            />
            <div className="flex flex-1 flex-col">
              <span className="font-medium">Goober Driver</span>
              <span className="text-xs text-indigo-700">
                Trip duration {rideDuration.toFixed(0)}min
              </span>
            </div>
            <text className="text-lg font-bold">
              {(rideDuration * valueCoefficient).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </text>
          </div>
        </div>
        <div className="m-2">
          <Button className="w-full p-6" onClick={handleConfirm}>
            Confirm Goober
          </Button>
        </div>
      </div>
    </div>
  )
}
