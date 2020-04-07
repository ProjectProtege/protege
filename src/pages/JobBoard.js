import React, { useState } from "react";
import JobCard from "../components/JobCard";

const tempJobData = [
  {
    postId: "124532",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Front-end",
  },
  {
    postId: "7345345",
    companyName: "NotReal",
    positionTitle: "Junior Backend Developer",
    location: "Seattle, WA",
    postDate: "Mar. 24",
    focus: "Back-end",
  },
  {
    postId: "98613855",
    companyName: "BildStuph",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Full-stack",
  },
  {
    postId: "8946541",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Front-end",
  },
  {
    postId: "684354",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Back-end",
  },
  {
    postId: "89646874",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Full-stack",
  },
  {
    postId: "138543541685",
    companyName: "NotReal",
    positionTitle: "Junior Backend Developer",
    location: "Seattle, WA",
    postDate: "Mar. 24",
    focus: "Front-end",
  },
  {
    postId: "6846168",
    companyName: "BildStuph",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Back-end",
  },
  {
    postId: "6874358",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Full-stack",
  },
  {
    postId: "6813584",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Front-end",
  },
  {
    postId: "681384384",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Back-end",
  },
  {
    postId: "1688354",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Full-stack",
  },
  {
    postId: "4168435",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    focus: "Front-end",
  },
];

function filteredJobs(tempJobData, jobFilter) {
  const filteredJobs = tempJobData.filter(job => {
    return job.focus === jobFilter
  })

  return filteredJobs
}

const JobBoard = () => {
  const [jobFilter, setJobFilter] = useState('');

  return (
    <div className="container mx-auto pt-32">
      <div className="flex justify-between mb-6">
        <h1 className=" text-2xl font-semibold text-teal-600 mb-6">
          {jobFilter ? `${jobFilter} Jobs` : 'All Jobs'}
        </h1>

        <div className="md:w-1/4">
          <label htmlFor="filter-by" className="sr-only">
            Filter
          </label>
          <select
            className="input rounded-full text-xs justify-end w-full cursor-pointer"
            id="filter-by"
            placeholder="Filter By"
            onChange={event => setJobFilter(event.target.value)}
          >
            <option value="" defaultValue>
              All
            </option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
            <option value="Full-stack">Full-stack</option>
          </select>
        </div>
      </div>

      <div className="mx-auto">
        {!jobFilter && (
          <React.Fragment>
            {tempJobData.map((job) => (
              <JobCard key={job.postId} job={job} />
            ))}
          </React.Fragment>
        )}

        {jobFilter && (
          <React.Fragment>
            {filteredJobs(tempJobData, jobFilter).map(job => (
              <JobCard key={job.postId} job={job}/>
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
