'use client'

import { Menu } from 'lucide-react'
import { MainNavigation } from './MainNavigation'
import { Profile } from './Profile'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Button } from '../Button'
import { GooberLogo } from '../GooberLogo'

export function Sidebar() {
  return (
    <Collapsible.Root className="fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 border-b border-indigo-200 bg-white p-4 data-[state=open]:bottom-0 lg:right-auto  lg:w-80 lg:border-r lg:px-5 lg:py-8 lg:data-[state=closed]:bottom-0">
      <div className="flex items-center justify-between">
        <GooberLogo />
        <Collapsible.Trigger asChild className="lg:hidden">
          <Button variant="ghost">
            <Menu className="h-6 w-6" />
          </Button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        forceMount
        className="flex flex-1 flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <MainNavigation />

        <div className="mt-auto flex flex-col gap-6">
          <div className="h-px bg-indigo-200" />

          <Profile />
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
