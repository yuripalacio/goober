import { LogOut } from 'lucide-react'
import { Button } from '../Button'
import Image from 'next/image'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export function Profile() {
  const router = useRouter()

  const handleExist = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <div className="grid grid-cols-profile items-center gap-3">
      <Image
        src="https://github.com/yuripalacio.png"
        className="h-10 w-10 rounded-full"
        width={24}
        height={24}
        alt=""
      />
      <div className="flex flex-1 flex-col truncate">
        <span className="text-sm font-semibold">Yuri Palacio</span>
        <span className="truncate text-sm text-zinc-500">
          yurifpalacio@gmail.com
        </span>
      </div>
      <Button type="button" variant="ghost" onClick={handleExist}>
        <LogOut className="h-5 w-5 text-indigo-500" />
      </Button>
    </div>
  )
}
