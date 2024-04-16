import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
const JobPostApplicants = () => {
  const { jobPostId } = useParams();
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchJobPostApplicants = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/jobpost/applicants?id=${jobPostId}`
        );
        const getJobRes = await response.json();
        setJobData(getJobRes);
        // console.log(getEducRes)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchJobPostApplicants();
  }, []);

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      {console.log(jobData)}
      <TopBar />

      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3">
            <div className="w-full bg-white h-full min-h-80 p-3 rounded-xl mb-20 flex flex-col">
              <div className="font-semibold text-2xl">{jobData.jobTitle}</div>
              {jobData.company && jobData.company.companyName && (
                <h2 className="font-semibold">{jobData.company.companyName}</h2>
              )}
              <div className="font-normal">{jobData.jobLoc}</div>

              <div className="w-fill h-96  mt-5 flex flex-row gap-3">
                <div className="w-full h-full">
                  <h1 className="h-5 font-semibold text-lg mb-3">Applicants</h1>

                  <div className="flex flex-col gap-3 h-full max-h-[150%] overflow-scroll">
                    {jobData.application &&
                      jobData.application.map((applicant) => (
                        <div
                          key={applicant.id}
                          className="bg-neutral p-3 flex flex-row justify-between rounded-md "
                        >
                          <div className="flex flex-col">
                            <div>
                              {applicant.person.firstName}{" "}
                              {applicant.person.middleName}{" "}
                              {applicant.person.lastName}
                            </div>
                            <select
                              className="select select-bordered select-xs w-24 mt-2 max-w-xs"
                              defaultValue={applicant.status}
                            >
                              <option disabled value={applicant.status}>{applicant.status}</option>
                              {applicant.status === "pending"&&(
                                <option value="accepted">accepted</option>
                              )}
                              <option value="rejected">rejected</option>
                            </select>
                          </div>
                          <div className="h-full flex items-center">
                            <Link
                              className="underline decoration-1 font-thin"
                              to={`/jobpost/applicants/resume/${applicant.person.id}`}
                            >
                              View Resume
                            </Link>
                          </div>
                        </div>
                      ))}
                    <div>data</div>
                    <div>data</div>
                    <div>data</div>
                    <div>data</div>
                    <div>data</div>
                    <div>data</div>
                    <div>data</div>
                    <div>data</div>
                    <div>data</div>
                    <div>data</div>
                    <div>data</div>
                  </div>
                </div>

                <div className="w-full h-full ">
                  <h1 className="h-5 font-semibold text-lg">Recommended</h1>
                  <div className="flex flex-col gap-3 h-full max-h-[150%] overflow-scroll">
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                    <div className="bg-neutral p-3 flex flex-row justify-between rounded-md ">
                      data
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostApplicants;
