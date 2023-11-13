'use client'

import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as Input from '@/components/Input'

const riderFormSchema = z.object({
  pickupLocation: z.string().min(1, { message: '4444' }),
  dropoffLocation: z.string().min(1, { message: '123' }),
})

type RiderFormSchema = z.infer<typeof riderFormSchema>

export default function RiderForm() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<RiderFormSchema>({
    resolver: zodResolver(riderFormSchema),
  })

  async function handleConfirmDestination(data: RiderFormSchema) {
    const { pickupLocation, dropoffLocation } = data

    const pickup = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickupLocation}.json?` +
        new URLSearchParams({
          access_token:
            'pk.eyJ1IjoieXVyaXBhbGFjaW8iLCJhIjoiY2xvcjhtaTk0MG9qODJqcXExYzlkNnZzMSJ9.1Y5eNIbaajikilUksaEaJg',
          limit: '1',
        }),
    )
      .then((response) => response.json())
      .then((data) => {
        return data.features[0].center
      })

    const dropoff = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoffLocation}.json?` +
        new URLSearchParams({
          access_token:
            'pk.eyJ1IjoieXVyaXBhbGFjaW8iLCJhIjoiY2xvcjhtaTk0MG9qODJqcXExYzlkNnZzMSJ9.1Y5eNIbaajikilUksaEaJg',
          limit: '1',
        }),
    )
      .then((response) => response.json())
      .then((data) => {
        return data.features[0].center
      })

    router.push(`/rider/confirm?pickup=${pickup}&dropoff=${dropoff}`)
  }

  return (
    <form
      className="flex flex-1 flex-col"
      id="riderForm"
      onSubmit={handleSubmit(handleConfirmDestination)}
    >
      <Input.Control
        name="pickupLocation"
        className="rounded-2 my-2 h-10 w-full rounded-md border-none bg-indigo-200 p-2 outline-none"
        placeholder="Enter with your location"
        register={register}
      />

      <Input.Control
        name="dropoffLocation"
        className="rounded-2 my-2 h-10 w-full rounded-md border-none  bg-indigo-200 p-2 outline-none"
        placeholder="Where to go?"
        register={register}
      />
    </form>
  )
}
