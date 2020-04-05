import React from "react";


import PostAJobForm from "../components/form/PostAJobForm"
import StatusBar from "../components/form/StatusBar"




const PostAJob = () => {
  return (
    <div className="container mx-auto mt-6 md:mt-12 p-2">
      <h1 className="text-lg md:text-2xl text-blue-500 font-bold text-center leading-snug">
        Inexperienced doesn’t mean incapable. <br />
        Fill your role with ambition.
      </h1>

        {/* Not Dynamic Yet */}
        <StatusBar /> 
        
        <PostAJobForm />
    </div>
  );
};

export default PostAJob;
