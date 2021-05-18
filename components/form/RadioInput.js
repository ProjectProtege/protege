import React from 'react'
// TODO: Formik is being imported but it not currently a dependency in package.json.
import { useField } from 'formik'

const RadioButton = ({ id, label, ...props }) => {
  const [field] = useField(props)

  return (
    <>
      <label htmlFor={id}>
        <input {...field} {...props} className='mr-3' id={id} />
        {label}
      </label>
    </>
  )
}

export default RadioButton
