'use client'

import MapCustom from '@/components/Map'

export default function Management() {
  return (
    <MapCustom
      baseCoordinates={{ longitude: -122.483696, latitude: 37.833818 }}
      customBounds={[
        [-122.483696, 37.833818],
        [-122.383696, 37.633818],
      ]}
    >
      {/* TODO - Fetch trips */}
    </MapCustom>
  )
}
