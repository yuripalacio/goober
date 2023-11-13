'use client'

import { Button } from '@/components/Button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ExistButton() {
  const router = useRouter()

  function handleExit() {
    localStorage.removeItem('@goober-yuri:passenger')
    router.push('/')
  }

  return (
    <Button onClick={handleExit} variant="ghost">
      <ArrowLeft className="cursor-pointer" />
    </Button>
  )
}
