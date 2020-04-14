import React, { useEffect, useState } from 'react'


const JobTemplate = ({recievingTemplateApproval, logo, props}) => {

  const [companyLogo, setCompanyLogo] = useState(undefined)
  
  function readLogo(logo){
    let reader = new FileReader();
    let file = logo
    if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCompanyLogo(reader.result)
        };

    }
  }
  
  const quillStyle = {
    h1: 'text-blue-500 font-bold text-xl',
    h2: 'text-blue-500 font-bold text-lg',
    h3: 'text-blue-500 font-bold text-md',
    a: 'text-teal-600 font-bold',
    p: 'text-blue-300',
    ol: 'list-decimal list-inside',
    ul: 'list-disc list-inside',
    li: 'pl-2 text-blue-300'
  }

  useEffect( () => {
    // Cleans up the text provided by QuillJS wysiwyg
    function styleChildren(children){
      children.forEach(child => {
        if(child.tagName === 'H1'){ child.classList = quillStyle.h1 }
        if(child.tagName === 'H2'){ child.classList = quillStyle.h2 }
        if(child.tagName === 'H3'){ child.classList = quillStyle.h3 }
        if(child.tagName === 'P'){ child.classList = quillStyle.p }
        if(child.tagName === 'A'){ child.classList = quillStyle.a }
        if(child.tagName === 'OL'){ 
          child.classList = quillStyle.ol 
          let listItems = [...child.children]
          listItems.forEach(listItem => {
            listItem.classList = quillStyle.li
          })
        }
        if(child.tagName === 'UL'){ 
          child.classList = quillStyle.ul 
          let listItems = [...child.children]
          listItems.forEach(listItem => {
            listItem.classList = quillStyle.li
          })
        }
        if(child.tagName === 'LI'){ child.classList = quillStyle.li }
        }
      )
    }
    var jobDesc = document.getElementById('jobDesc')
    var jobChildren = [...jobDesc.children]
    styleChildren(jobChildren)
    var companyDesc = document.getElementById('companyDesc')
    var companyChildren = [...companyDesc.children]
    styleChildren(companyChildren)

    // Setting Logo
    readLogo(logo)

    })

  function createMarkup(text){
    return {__html: text}
  }

  return(
    <>
      <div className='flex justify-center content-start'>
        {/* Needs Link back to Job List */}
        {/* <a href='#'>Back to Job List </a> */}
        <div className='w-3/5 pr-2'>

          <h2 className='text-blue-500 font-bold text-3xl'>{props.jobTitle || 'Position Title'}, {props.companyName || "Company Name"}</h2>
          <div className='text-gray-600 uppercase tracking-tight text-md mb-4'>{props.roleFocus} • {props.positionType}</div>
          <h3 className='text-blue-500 font-bold text-2xl'>Job Description</h3>
          <div className='mt-2' id='jobDesc' dangerouslySetInnerHTML={createMarkup(props.jobDescription)}></div>
          <h4 className='text-blue-500 font-bold text-2xl'>About {props.companyName}</h4>
          <div className='mt-2 text-blue-300' id='companyDesc' dangerouslySetInnerHTML={createMarkup(props.companyDescription)}></div>

        </div>
        <div className='flex-row w-2/5 bg-gray-200 flex-wrap mt-16 p-4 min-h-64'>
              <h4 className='text-blue-500 font-bold text-2xl flex-wrap'>About {props.companyName}</h4>
              <div className='text-gray-600 uppercase tracking-tight text-md'>
                <a href={props.companyWebsite}>Website</a> • <a href={`mailto:${props.companyEmail}`}>Contact Email</a>
              </div>
              {logo ? <img id='companyLogo' className='m-2 object-contain' src={companyLogo} alt={`${props.companyName} logo`} /> : null}
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