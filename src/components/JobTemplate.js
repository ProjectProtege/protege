import React from 'react'


const JobTemplate = ({recievingTemplateApproval, props}) => {

  function createMarkup(text){
    return {__html: text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
  }

  return(
    <>
      <div className='flex justify-center content-start'>
        {/* Needs Link back to Job List */}
        {/* <a href='#'>Back to Job List </a> */}
        <div className='w-3/5 pr-2'>

          <h2 className='text-blue-500 font-bold text-2xl'>{props.jobTitle || 'Position Title'}, {props.companyName || "Company Name"}</h2>
          <div className='text-gray-600 uppercase tracking-tight text-md'>{props.roleFocus} • {props.positionType}</div>
          <p className='mt-8 text-blue-300' dangerouslySetInnerHTML={createMarkup(props.jobDescription)}></p>
        </div>
        <div className='flex-row w-2/5 bg-gray-200 flex-wrap p-4'>
              <h4 className='text-blue-500 font-bold text-2xl flex-wrap'>About {props.companyName}</h4>
              <div className='text-gray-600 uppercase tracking-tight text-md'>
                <a href={props.companyWebsite}>Website</a> • <a href={`mailto:${props.companyEmail}`}>Contact Email</a>
              </div>
              <p className='mt-8 text-blue-300'dangerouslySetInnerHTML={createMarkup(props.companyDescription)}></p>
        </div>
      </div>
      <div className='flex-row'>
        <a href={props.howToApply}><button className='btn btn-teal mt-8'>Apply</button></a>
      </div>

      <button className='btn btn-teal mt-8' onClick={recievingTemplateApproval}>Confirm Your Posting</button>

    </>
  )
}

export default JobTemplate