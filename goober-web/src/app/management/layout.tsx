import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'

export default function ManagementLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="grid min-h-screen grid-cols-app">
      <Sidebar />
      <main className="max-w-screen px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:p-2">
        {children}
      </main>
    </div>
  )
}
