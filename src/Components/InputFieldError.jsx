import React from 'react'

function InputFieldError({errorMsg}) {
  return (
    <p className="text-red-500 text-sm">{errorMsg}</p>
  )
}

export default InputFieldError
