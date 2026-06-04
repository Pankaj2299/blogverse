import React from 'react'
import { forwardRef, useId } from 'react'

function Select({
  options,
  className = "",
  label,
  ...props
}, ref) {

  const id = useId()

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className='inline-block mb-2 text-sm font-medium text-slate-700'>

          {label}

        </label>
      )}

      <select {...props}
        id={id}
        ref={ref}
        className={` w-full px-4 py-3 rounded-xl bg-white text-slate-800 border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-md
             ${className}

           `}
      >

        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}

      </select>



    </div>
  )
}

export default forwardRef(Select)
