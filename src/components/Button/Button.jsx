import React from 'react'

function Button({ children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button className={`px-5 py-2.5 rounded-xl ${bgColor} ${textColor}font-medium shadow-sm hover:opacity-90  hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`} {...props}>

      {children}

    </button>

  )
}

export default Button







