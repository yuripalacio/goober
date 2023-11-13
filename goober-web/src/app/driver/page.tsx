'use client'

import { Button } from '@/components/Button'
import MapCustom from '@/components/Map'
import PassengerPin from '@/components/Map/PassengerPin'
import PersonalPin from '@/components/Map/PersonalPin'
import { api } from '@/data/api'
import { User } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Layer, Marker, Source } from 'react-map-gl'

export default function RiderConfirm() {
  const router = useRouter()
  const valueCoefficient = 0.87
  const riderParams = useSearchParams()

  const [tripId, setTripId] = useState('')
  const [passengerName, setPassengerName] = useState('')
  const [passengerLocation, setPassengerLocation] = useState<
    [number, number] | null
  >(null)
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(
    null,
  )
  const [routeCoordinates, setRouteCoordinates] = useState<
    [[number, number]] | null
  >(null)
  const [rideDuration, setRideDuration] = useState(0)
  const [ridePrice, setRidePrice] = useState(0)

  const dropoff = riderParams.get('dropoff')

  function handleGetDropoffCoordinates(dropoff: string) {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            'pk.eyJ1IjoieXVyaXBhbGFjaW8iLCJhIjoiY2xvcjhtaTk0MG9qODJqcXExYzlkNnZzMSJ9.1Y5eNIbaajikilUksaEaJg',
          limit: '1',
        }),
    )
      .then((response) => response.json())
      .then((data) => {
        // setDropoffCordinates(data.features[0].center)
      })
  }

  const handleCancel = useCallback(() => {
    router.push('/')
  }, [router])

  const handleFindTrip = useCallback(() => {
    api('trips/available')
      .then((response) => response.json())
      .then(({ trips }) => {
        if (trips.length > 0) {
          const trip = trips[0]
          setTripId(trip.tripId)
          setPassengerName(trip.passenger)

          const passengerLocation = trip.startPoint
            .split(',')
            .map((p: string) => Number(p))

          setPassengerLocation(passengerLocation)

          const driverLocation: [number, number] = [
            passengerLocation[0] - 0.00402,
            passengerLocation[1] - 0.003023,
          ]

          setDriverLocation(driverLocation)

          let url =
            `https://api.mapbox.com/directions/v5/mapbox/driving/${driverLocation.join(
              ',',
            )};${trip.startPoint}?` +
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

          url =
            `https://api.mapbox.com/directions/v5/mapbox/driving/${trip.startPoint};${trip.destination}?` +
            'geometries=geojson&' +
            new URLSearchParams({
              access_token:
                'pk.eyJ1IjoieXVyaXBhbGFjaW8iLCJhIjoiY2xvcjhtaTk0MG9qODJqcXExYzlkNnZzMSJ9.1Y5eNIbaajikilUksaEaJg',
            })
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data.routes[0]) {
                setRidePrice(data.routes[0].duration / 100)
              }
            })
        }
      })
  }, [])

  const handleDecline = useCallback(() => {
    setTripId('')
    setPassengerName('')
    setPassengerLocation(null)
    setDriverLocation(null)
    setRouteCoordinates(null)
    setRideDuration(0)
    setRidePrice(0)
  }, [])

  const handleAccept = useCallback(() => {
    api(`trips/set-driver/${tripId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        driverId: 'Yuri Fortunato Palacio',
      }),
    })
  }, [tripId])

  useEffect(() => {
    if (dropoff) {
      handleGetDropoffCoordinates(dropoff)
    }
  }, [dropoff])

  return (
    <div className="flex h-screen flex-col">
      <div className="absolute left-4 top-4 z-10 cursor-pointer rounded-full bg-white shadow-md">
        <Button onClick={handleFindTrip}>Find trip</Button>
      </div>
      {driverLocation && passengerLocation ? (
        <MapCustom
          baseCoordinates={{
            longitude: driverLocation[0],
            latitude: driverLocation[1],
          }}
          customBounds={[driverLocation, passengerLocation]}
        >
          <Marker
            key="driverLocation"
            latitude={driverLocation[1]}
            longitude={driverLocation[0]}
            anchor="bottom"
          >
            <PersonalPin size={40} />
          </Marker>
          {routeCoordinates && (
            <>
              <Marker
                key="destinationLocation"
                latitude={passengerLocation[1]}
                longitude={passengerLocation[0]}
                anchor="bottom"
              >
                <PassengerPin size={40} />
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
      ) : (
        <div className="flex-1 bg-zinc-300"></div>
      )}

      <div className="flex h-1/3 flex-col items-center justify-between p-2">
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          {driverLocation ? (
            <>
              <div className="flex w-full items-center px-2 py-4">
                <User className="h-16 w-16" />
                <div className="flex flex-1 flex-col items-center justify-center">
                  <span className="text-xl">
                    {rideDuration.toFixed(0)} min away
                  </span>
                  <span className="text-md mt-3">{passengerName}</span>
                </div>
                <span className="text-xl">
                  {(ridePrice * valueCoefficient).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="grid w-full grid-cols-2 gap-2">
                <Button
                  className="py-4"
                  variant="outline"
                  onClick={handleDecline}
                >
                  Decline
                </Button>
                <Button onClick={handleAccept} className="w-full py-4">
                  Accept
                </Button>
              </div>
            </>
          ) : (
            <span className="text-lg text-indigo-400">
              Searching for a trip...
            </span>
          )}
        </div>

        {!driverLocation && (
          <Button className="mt-2 w-full py-4" onClick={handleCancel}>
            Exit
          </Button>
        )}
      </div>
    </div>
  )
}
