'use client'

import { LockKeyhole, User } from 'lucide-react'
import * as Input from '@/components/Input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { api } from '@/data/api'
import { setCookie } from 'nookies'

const signInFormSchema = z.object({
  username: z.string().min(1, { message: 'Name obligatory' }),
  password: z.string().min(1, { message: 'Password obligatory' }),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
  })

  async function handleSignIn(info: SignInFormSchema) {
    const { username } = info

    await api('/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem('@goober-yuri:passenger', data.passenger.id),
      )

    router.push(`/rider`)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="mt-6 flex w-full flex-col gap-5"
    >
      <Input.Root>
        <Input.Prefix>
          <User className="h-5 w-5 text-indigo-500" />
        </Input.Prefix>
        <Input.Control
          name="username"
          className="bg-transparent text-lg"
          defaultValue="Yuri Palacio"
          register={register}
        />
      </Input.Root>
      <Input.Root>
        <Input.Prefix>
          <LockKeyhole className="h-5 w-5 text-indigo-500" />
        </Input.Prefix>
        <Input.Control
          name="password"
          className="bg-transparent text-lg "
          type="password"
          defaultValue="Yuri Palacio"
          register={register}
        />
      </Input.Root>

      <Button
        type="submit"
        className="text-md x-4 rounded-lg py-6 font-semibold"
        variant="primary"
      >
        Sign-in
      </Button>
    </form>
  )
}
