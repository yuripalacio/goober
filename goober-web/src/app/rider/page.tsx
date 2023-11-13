import Image from 'next/image'
import { Button } from '@/components/Button'
import RiderForm from './components/RiderForm'
import ExistButton from './components/ExitButton'

export default function Rider() {
  return (
    <div className="flex h-screen flex-col bg-indigo-100">
      <header className="mt-2 bg-indigo-50">
        <div className="flex items-center px-4 py-1">
          <ExistButton />
          <div className="flex flex-1 items-center justify-center">
            <Image
              src="https://github.com/yuripalacio.png"
              className="h-6 w-6 rounded-full"
              width={24}
              height={24}
              alt=""
            />
            <span className="ml-2">Yuri Fortunato Palacio</span>
          </div>
        </div>
      </header>
      <div className="mb-2 flex items-center px-4">
        <div className="mr-2 flex w-10 flex-col items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-blue-400" />
          <div className="my-1 h-10 w-0.5 bg-blue-400" />
          <div className="h-2 w-2 bg-blue-700" />
        </div>
        <RiderForm />
      </div>

      <Button
        form="riderForm"
        type="submit"
        className="text-md w-screem mx-2 rounded-lg py-3 font-semibold"
        variant="primary"
      >
        Confirm Destination
      </Button>
      {/* <MapCustom /> */}
    </div>
  )
}

// import MapBox from '@/components/Map'

// export default function Home() {
//   return (
//     <>
//       <MapBox />
//     </>
//   )
// }
