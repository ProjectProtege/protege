import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'


const JobTemplate = ({recievingTemplateApproval, props}) => {
  
  const quillStyle = {
    h1: 'text-blue-500 font-bold text-3xl',
    h2: 'text-blue-500 font-bold text-2xl',
    h3: 'text-blue-500 font-bold text-xl',
    h4: 'text-blue-500 font-bold text-lg', 
    a: 'text-teal-600 font-bold',
    p: 'text-blue-300',
    ol: 'list-decimal list-inside',
    ul: 'list-disc list-inside',
    li: 'text-blue-300'
  }

  useEffect( () => {
    // Cleans up the text provided by QuillJS wysiwyg
    function styleChildren(children){
      children.forEach(child => {
        console.log('in the foreach?')
        if(child.tagName === 'H1'){ child.classList = quillStyle.h1 }
        if(child.tagName === 'H2'){ child.classList = quillStyle.h2 }
        if(child.tagName === 'H3'){ child.classList = quillStyle.h3 }
        if(child.tagName === 'p'){ child.classList = quillStyle.p }
        // below need to be nested loops
        if(child.tagName === 'a'){ child.classList = quillStyle.a }
        if(child.tagName === 'ol'){ child.classList = quillStyle.ol }
        if(child.tagName === 'ul'){ child.classList = quillStyle.ul }
        if(child.tagName === 'li'){ child.classList = quillStyle.li }
        }
      )
    }
    console.log('updating jobDesc')
    var jobDesc = document.getElementById('jobDesc')
    var jobChildren = [...jobDesc.children]
    styleChildren(jobChildren)
    console.log('updating companyDesc')
    var companyDesc = document.getElementById('companyDesc')
    var companyChildren = [...companyDesc.children]
    styleChildren(companyChildren)
    })

  function createMarkup(text){
    // console.log('text', text)
    return {__html: text}
  }

  return(
    <>
      <div className='flex justify-center content-start'>
        {/* Needs Link back to Job List */}
        {/* <a href='#'>Back to Job List </a> */}
        <div className='w-3/5 pr-2'>

          <h2 className='text-blue-500 font-bold text-2xl'>{props.jobTitle || 'Position Title'}, {props.companyName || "Company Name"}</h2>
          <div className='text-gray-600 uppercase tracking-tight text-md'>{props.roleFocus} • {props.positionType}</div>
          <div className='mt-8' id='jobDesc' dangerouslySetInnerHTML={createMarkup(props.jobDescription)}></div>
        </div>
        <div className='flex-row w-2/5 bg-gray-200 flex-wrap p-4'>
              <h4 className='text-blue-500 font-bold text-2xl flex-wrap'>About {props.companyName}</h4>
              <div className='text-gray-600 uppercase tracking-tight text-md'>
                <a href={props.companyWebsite}>Website</a> • <a href={`mailto:${props.companyEmail}`}>Contact Email</a>
              </div>
              <div className='mt-8 text-blue-300' id='companyDesc' dangerouslySetInnerHTML={createMarkup(props.companyDescription)}></div>
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