import React from 'react';
import { useField } from 'formik';

const RadioButton = ({ id, label, ...props}) => {
  const [field] = useField(props);

  return (
    <>
      <label htmlFor={id}>
        <input
          {...field}
          {...props}
          className="mr-3"
          id={id}
        />
        {label}
      </label>
    </>
  )
}

export default RadioButton