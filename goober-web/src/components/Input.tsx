import { ComponentProps, InputHTMLAttributes, useEffect, useState } from 'react'
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form'

type InputPrefixProps = ComponentProps<'div'>

export function Prefix(props: InputPrefixProps) {
  return <div {...props} />
}

interface InputControlProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
}

export function Control({ register, name, ...props }: InputControlProps) {
  const [inputRegister, setInputRegister] = useState<UseFormRegisterReturn<string> | null>(null)

  useEffect(() => {
    if (register && name) {
      setInputRegister(register(name))
    }
  }, [register, name])

  return (
    <input
      className="flex-1 border-0 border-none bg-transparent p-0 text-indigo-900 placeholder-indigo-600 outline-none"
      {...inputRegister}
      {...props}
    />
  )
}

export type InputRootProps = ComponentProps<'div'>

export function Root(props: InputRootProps) {
  return (
    <div
      className="mx-1 flex w-full items-center gap-2 rounded-lg border border-indigo-300 px-3 py-2 shadow-sm"
      {...props}
    />
  )
}
