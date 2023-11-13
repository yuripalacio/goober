import Link from 'next/link'
import { ElementType } from 'react'

export interface NavItemProps {
  title: string
  icon: ElementType
  isSelected?: boolean
  route: string
}

export function NavItem({
  title,
  icon: Icon,
  route,
  isSelected = false,
}: NavItemProps) {
  return (
    <Link
      href={route}
      className={`group flex items-center gap-3 rounded px-3 py-2 ${
        !isSelected ? 'hover:bg-indigo-50' : 'bg-indigo-50'
      }`}
    >
      <Icon
        className={`h-5 w-5 ${
          !isSelected ? 'group-hover:text-indigo-500' : 'text-indigo-500'
        }`}
      />
      <span
        className={`font-medium ${
          !isSelected ? 'group-hover:text-indigo-500' : 'text-indigo-500'
        }`}
      >
        {title}
      </span>
    </Link>
  )
}
