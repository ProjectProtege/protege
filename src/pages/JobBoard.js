import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import { db } from "../firebase/firebase";

const JobBoard = ({ location, match }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async function retrieveJobs() {
      const querySnapshot = await db
        .collection("jobs")
        .where("approved", "==", true)
        .orderBy('postedAt', 'desc')
        .get();

      const jobList = querySnapshot.docs.map((documentSnapshot) => {
        let doc = documentSnapshot;
        let job = documentSnapshot.data();

        return {
          id: doc.id,
          jobTitle: job.jobtitle,
          roleFocus: job.roleFocus,
          companyHQ: job.companyHQ,
          companyName: job.companyName,
          postedAt: job.postedAt,
          companyLogo: job.companyLogo,
        };
      });
      setJobs(jobList);
    })();
  }, []);

  function filteredJobs(jobs, jobFilter) {
    const filteredJobs = jobs.filter((job) => {
      return job.roleFocus === jobFilter;
    });

    return filteredJobs;
  }

  const filterQueryParam = location.search
    .replace("?", "")
    .split("&")
    .find((qs) => qs[0] === "f");

  const initialFilterValue = filterQueryParam
    ? filterQueryParam.split("=")[1]
    : "";

  const [jobFilter, setJobFilter] = useState(initialFilterValue);

  useEffect(() => {
    setJobFilter(initialFilterValue);
  }, [initialFilterValue]);

  return (
    <div className="container mx-auto pt-32 px-2 md:px-0">
      <div className="w-full lg:w-3/5 mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-teal-600 mb-6">
            {jobFilter ? `${jobFilter} Jobs` : "All Jobs"}
          </h1>

          <div className="w-1/2 md:w-1/4 relative">
            <label htmlFor="filter-by" className="sr-only">
              Filter
            </label>

            <div className="select-wrap">
              <select
                className="input input-select rounded-none justify-end"
                id="filter-by"
                placeholder="Filter By"
                onChange={(event) => setJobFilter(event.target.value)}
                value={jobFilter}
              >
                <option value="">All</option>
                <option value="Front-end">Front-end</option>
                <option value="Back-end">Back-end</option>
                <option value="Full-stack">Full-stack</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mx-auto">
          {!jobFilter && (
            <React.Fragment>
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </React.Fragment>
          )}

          {jobFilter && (
            <React.Fragment>
              {filteredJobs(jobs, jobFilter).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
