import React, { useState } from 'react'
import { useJobForm } from 'store/job-post_store'
import PropTypes from 'prop-types'

export default function LogoUpload({ register }) {
  const [fileResult, setFileResult] = useState(undefined)
  const [fileName, setFileName] = useState('')
  const setavatarFile = useJobForm((s) => s.setavatarFile)

  const handleLogoChange = (e) => {
    const reader = new FileReader()
    const file = e.target.files[0]

    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setFileName(file.name)
        setFileResult(reader.result)
        setavatarFile(file)
      }
    }
  }

  return (
    <div className='md:flex'>
      <div className='flex flex-col md:w-1/2 md:pr-3'>
        <label
          htmlFor='avatar'
          className='relative h-24 w-full mb-2 border flex border-dashed border-blue-300 text-center cursor-pointer focus-within:outline-teal'
        >
          {fileResult ? (
            <img
              data-cy='company-logo-uploaded'
              className='h-full p-2 mx-auto my-auto'
              src={fileResult}
              alt='logo preview'
            />
          ) : (
            <span className='text-teal-500 mx-auto my-auto text-2xl'>+</span>
          )}
          <input
            ref={register}
            data-cy='company-logo-upload'
            className='absolute w-full h-full cursor-pointer opacity-0'
            id='avatar'
            onChange={handleLogoChange}
            name='avatar'
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            multiple={false}
          />
        </label>
      </div>
      <div className='flex flex-col md:flex-row md:w-1/2'>
        <span
          data-cy='logo-upload-fileName'
          className='text-blue-500 text-xs tracking-tight'
        >
          {fileName
            ? `Uploaded: ${fileName}`
            : "Please provide a .png, .jpeg, or .jpg format of your company's logo to be displayed with your job opening listing."}
        </span>
      </div>
    </div>
  )
}

LogoUpload.propTypes = {
  register: PropTypes.func.isRequired,
}
