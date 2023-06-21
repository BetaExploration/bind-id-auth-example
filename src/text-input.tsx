import React from "react"

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const TextInput = (props: TextInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.id} className="text-md font-semibold text-gray-100">
        {props.label}
      </label>
      <input
        className="rounded-md border border-gray-300 bg-gray-600 px-4 py-2 text-gray-100"
        {...props}
      />
    </div>
  )
}
