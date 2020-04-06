import React from "react";
import JobCard from "../components/JobCard";

const tempJobData = [
  {
    postId: "124532",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["React", "GraphQL", "Apollo"],
  },
  {
    postId: "7345345",
    companyName: "NotReal",
    positionTitle: "Junior Backend Developer",
    location: "Seattle, WA",
    postDate: "Mar. 24",
    tags: ["Elixir", "Postgres", "Sql"],
  },
  {
    postId: "98613855",
    companyName: "BildStuph",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["Vue", "Node", "Bootstrap"],
  },
  {
    postId: "8946541",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["React", "GraphQL", "Apollo"],
  },
  {
    postId: "684354",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["React", "GraphQL", "Apollo"],
  },
  {
    postId: "89646874",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["React", "GraphQL", "Apollo"],
  },
  {
    postId: "138543541685",
    companyName: "NotReal",
    positionTitle: "Junior Backend Developer",
    location: "Seattle, WA",
    postDate: "Mar. 24",
    tags: ["Elixir", "Postgres", "Sql"],
  },
  {
    postId: "6846168",
    companyName: "BildStuph",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["Vue", "Node", "Bootstrap"],
  },
  {
    postId: "6874358",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["React", "GraphQL", "Apollo"],
  },
  {
    postId: "6813584",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["React", "GraphQL", "Apollo"],
  },
  {
    postId: "681384384",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["React", "GraphQL", "Apollo"],
  },
  {
    postId: "1688354",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["React", "GraphQL", "Apollo"],
  },
  {
    postId: "4168435",
    companyName: "Fake.io",
    positionTitle: "Junior Frontend Developer",
    location: "Jacksonville, FL",
    postDate: "Mar. 24",
    tags: ["React", "GraphQL", "Apollo"],
  },
];

const JobBoard = () => (
  <div className="container mx-auto pt-32">
    <div className="flex justify-between mb-6">
      <h1 className=" text-2xl font-semibold text-teal-600 mb-6">
        Frontend Jobs
      </h1>

      <div class="w-1/5">
        <label for="filter-by" className="sr-only">
          Filter
        </label>
        <select className="input justify-end w-full cursor-pointer" id="filter-by" placeholder="Filter By">
          <option value="" selected disabled>
            Filter by
          </option>
          <option value="">Front-end</option>
          <option value="">Back-end</option>
          <option value="">Full-stack</option>
        </select>
      </div>
    </div>

    <div className="mx-auto">
      {tempJobData.map((job) => (
        <JobCard key={job.postId} job={job} />
      ))}
    </div>
  </div>
);

export default JobBoard;
