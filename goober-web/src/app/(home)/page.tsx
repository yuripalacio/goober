import { GooberLogo } from '@/components/GooberLogo'
import { SignInForm } from './components/SignInForm'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <header>
        <GooberLogo />
      </header>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="pb-5 text-center text-4xl">
          Sign-in to access your account
        </h1>
        <SignInForm />
      </div>
      <Link href="/driver">
        <span className="text-indigo-400">Access as a driver</span>
      </Link>

      <Link href="/management">
        <span className="text-indigo-400">Access as a company member</span>
      </Link>
    </div>
  )
}
