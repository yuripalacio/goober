'use client'

import { BarChart, CarFrontIcon, Map } from 'lucide-react'
import { NavItem } from './NavItem'
import { usePathname } from 'next/navigation'

export function MainNavigation() {
  const currentPage = usePathname()

  return (
    <nav className="space-y-0.5">
      <NavItem
        title="Map"
        icon={Map}
        isSelected={currentPage === '/management'}
        route="/management"
      />
      <NavItem
        title="Riders"
        icon={CarFrontIcon}
        isSelected={currentPage === '/management/riders'}
        route="/management/riders"
      />
    </nav>
  )
}
