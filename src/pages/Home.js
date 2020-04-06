import React from "react";
import FindYourNext from "../components/FindYourNext";
import JobCard from "../components/JobCard";

import heroBG from "../assets/images/bg-pattern.png";
import mobileBG from '../assets/images/mobile-bg-pattern.png'

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

const Home = () => (
  <div>
    <img src={heroBG} alt="" className="hidden md:block absolute top-0 left-0 w-full" />
    <img src={mobileBG} alt="" className="fixed md:hidden w-screen"/>

    <div className="relative pt-20 lg:pt-32 px-3">
      <FindYourNext />
      <div className="flex md:w-3/4 flex-col text-center mx-auto mt-6">
        <p className="tracking-wide font-light lg:w-3/4 mx-auto text-lg text-blue-400 mb-6">
          Looking for your next junior developer role? Look no further! Any jobs
          listed here are geared for those hungry to work and learn.
        </p>
        <button className="btn btn-teal mx-auto text-xl">Find A Job</button>
      </div>

      <div className="mt-12 lg:pt-16 mx-auto px-3" style={{ maxWidth: 680 }}>
        <h2 className="text-center text-2xl text-blue-500 font-bold mb-8">
          Latest Opportunities
        </h2>

        <div>
          {tempJobData.slice(0, 6).map((job) => (
            <JobCard key={job.postId} job={job} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Home;
