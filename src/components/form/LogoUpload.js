import React, { useState } from 'react'

function LogoUpload({ recievingLogo, ...props }) {
  const [fileResult, setFileResult] = useState(undefined)
  const [fileName, setFileName] = useState('')

  const handleLogoChange = (e) => {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setFileName(file.name)
        setFileResult(reader.result)
        props.setFieldValue('companyLogo', file)
        recievingLogo(file)
      }
    }
  }

  return (
    <div className='md:flex'>
      <div className='flex flex-col md:w-1/2 md:pr-3'>
        <label
          htmlFor='companyLogo'
          className='h-24 w-full mb-2 border flex border-dashed border-blue-300 text-center cursor-pointer'
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
            data-cy='company-logo-upload'
            onChange={handleLogoChange}
            id='companyLogo'
            name='companyLogo'
            className='hidden'
            type='file'
            accept='image/png'
          ></input>
        </label>
      </div>
      <div className='flex flex-col md:w-1/2'>
        <span
          data-cy='logo-upload-fileName'
          className='text-blue-500 text-xs tracking-tight'
        >
          {fileName
            ? `Uploaded: ${fileName}`
            : "Please provide a .png format of your company's logo to be displayed with your job opening listing."}
        </span>
      </div>
    </div>
  )
}
export default LogoUpload
