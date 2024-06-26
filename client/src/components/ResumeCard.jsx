import React, { useEffect, useState } from "react";
import TopBar from "./topbar";
import DateToWords from "./DateFormatter";
import ButtonPrimary from "./ButtonPrimary";
import SideBar from "./SideBar";

const ResumeCard = () => {
  const [personData, setPersonData] = useState("");
  const [userData, setUserData] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [educData, setEducData] = useState([]);
  const [degree, setDegree] = useState([]);
  // const [degreeIds, setDegreeId] = useState([])
  const [certs, setCerts] = useState([]);
  const [licenses, setLicense] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");

  const downloadResume = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/person/resume/download?id=${userData.id}`,
        {
          headers: {
            credentials: "include",
          },
        }
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setPdfUrl(url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/details", {
          credentials: "include",
        });
        const getUserResult = await response.json();
        setUserData(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchPersonData = async () => {
      try {
        const response = await fetch("http://localhost:3000/person/details", {
          credentials: "include",
        });
        const getPersonResult = await response.json();
        setPersonData(getPersonResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchExperience = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/experience/person/index`,
          {
            credentials: "include",
          }
        );
        const getUserResult = await response.json();
        setExperience(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/skills/person/index`,
          {
            credentials: "include",
          }
        );
        const getUserResult = await response.json();
        setSkills(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchEducation = async () => {
      try {
        const response = await fetch("http://localhost:3000/education/index", {
          credentials: "include",
        });
        const getEducRes = await response.json();
        // setDegreeId(getEducRes.map(educ => educ.degreeId))
        setEducData(getEducRes);

        const degreeIds = getEducRes.map((educ) => educ.degreeId);

        const fetchDegree = async () => {
          try {
            const response = await fetch(
              `http://localhost:3000/degree/index?ids=${degreeIds.join(",")}`,
              {
                credentials: "include",
              }
            );
            const getUserResult = await response.json();
            setDegree(getUserResult);
            // console.log(getUserResult)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchDegree();
        // console.log(getEducRes)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchCerts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/certification/person/index`,
          {
            credentials: "include",
          }
        );
        const getUserResult = await response.json();
        setCerts(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchLicense = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/license/person/index`,
          {
            credentials: "include",
          }
        );
        const getUserResult = await response.json();
        setLicense(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLicense();
    fetchCerts();
    fetchEducation();
    fetchSkills();
    fetchExperience();
    fetchPersonData();
    fetchUserData();
    // console.log(degree)
  }, []);

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3 overflow-scroll">
            <div className="w-full bg-white h-fit p-3 rounded-xl mb-20 flex flex-col">
              <div className="flex flex-col gap-1 items-center">
                <h1 className="font-semibold text-lg">
                  {personData.firstName +
                    " " +
                    personData.middleName +
                    " " +
                    personData.lastName +
                    " " +
                    personData.suffix}
                </h1>
                <p>{userData.contactNum + " " + userData.emailAddress}</p>
              </div>

              {experience.length != 0 && (
                <div>
                  <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
                    <span className="font-bold">Experience</span>
                  </div>

                  <div>
                    {experience.map((experience) => (
                      <div key={experience.id} className="flex flex-col mb-5">
                        <span className="font-semibold">
                          {experience.jobTitle}
                        </span>
                        <span className="">{experience.companyName}</span>
                        <div className="flex flex-row gap-1">
                          <span className="font-thin">
                            <DateToWords dateString={experience.startDate} />
                          </span>
                          <span className="font-thin">-</span>
                          <span className="font-thin">
                            <DateToWords dateString={experience.endDate} />
                          </span>
                        </div>
                        <ul className="list-disc ml-8 font-thin">
                          {experience.jobDetails
                            .split("\r\n")
                            .map((line, index) => (
                              <li key={index}>{line}</li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skills.length != 0 && (
                <div>
                  <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
                    <span className="font-bold">Skills</span>
                  </div>

                  <div className="pl-5">
                    <ul className="font-normal list-disc">
                      {skills.map((skill) => (
                        <li key={skill.id}>{skill.skillName}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {educData.length != 0 && (
                <div>
                  <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
                    <span className="font-bold">Education</span>
                  </div>

                  <div>
                    {educData.map((education) => (
                      <div key={education.id} className="flex flex-col mb-5">
                        <span className="font-semibold">
                          {education.schoolName}
                        </span>
                        {degree.find(
                          (deg) => deg.id === education.degreeId
                        ) && (
                          <span className="">
                            {
                              degree.find(
                                (deg) => deg.id === education.degreeId
                              ).degreeName
                            }
                          </span>
                        )}
                        <div className="flex flex-row gap-1">
                          <span className="font-thin">
                            <DateToWords dateString={education.startDate} />
                          </span>
                          <span className="font-thin">-</span>
                          <span className="font-thin">
                            <DateToWords dateString={education.endDate} />
                          </span>
                        </div>
                        <span className="font-thin">
                          {"QPI: " + education.qpi}
                        </span>
                        <span className="font-thin">{education.awards}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {licenses.length != 0 && (
                <div>
                  <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
                    <span className="font-bold">Licenses</span>
                  </div>

                  <div className="pl-5">
                    <ul className="font-normal list-disc">
                      {licenses.map((license) => (
                        <li key={license.id}>{license.licenseName}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {certs.length != 0 && (
                <div>
                  <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
                    <span className="font-bold">Certifications</span>
                  </div>

                  <div className="pl-5">
                    <ul className="font-normal list-disc">
                      {certs.map((cert) => (
                        <li key={cert.id}>{cert.certName}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex flex-row justify-end w-full">
                <button
                  type="button"
                  className="btn btn-success w-40 mt-5 mb-3 text-white"
                  onClick={downloadResume}
                >
                  Downlod PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
