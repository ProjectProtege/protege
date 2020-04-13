import React, { useState } from "react";


import PostAJobForm from "../components/form/PostAJobForm"
import StatusBar from "../components/form/StatusBar"
import JobTemplate from "../components/JobTemplate";
import JobPostingConfirmation from '../components/JobPostingConfirmation'



const PostAJob = () => {
    const [status, setStatus] = useState(1)
    const [jobData, setJobData] = useState()
    function receivingJobData(e){ 
        setJobData(e);
        setStatus(2)
     }
    function recievingTemplateApproval(e){
        console.log('recieved template approval')
        setStatus(3)
    }

  return (
    <div className="container mx-auto mt-6 md:mt-12 p-2">
        <h1 className="text-lg md:text-2xl text-blue-500 font-bold text-center leading-snug">
            Inexperienced doesn’t mean incapable. <br />
            Fill your role with ambition.
        </h1>

        <StatusBar props={status} /> 
        {status === 1 && !jobData && <PostAJobForm receivingJobData={receivingJobData}/>}
        {status === 2 && jobData && <JobTemplate props={jobData} recievingTemplateApproval={recievingTemplateApproval}/>}
        {status === 3 && jobData && <JobPostingConfirmation props={jobData}/>}

    </div>
  );
};

export default PostAJob;