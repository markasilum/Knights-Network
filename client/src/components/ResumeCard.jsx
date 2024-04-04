import React, { useEffect, useState } from "react";
import TopBar from "./topbar";
import DateToWords from "./DateFormatter";

const ResumeCard = () => {
  const [personData, setPersonData] = useState("");
  const [userData, setUserData] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [educData, setEducData] = useState([]);
  const[degree, setDegree] = useState([])
  // const [degreeIds, setDegreeId] = useState([])
  const[certs, setCerts] = useState([])
  const[licenses, setLicense] = useState([])



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/details");
        const getUserResult = await response.json();
        setUserData(getUserResult);
        // console.log(getUserResult)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchPersonData = async () => {
      try {
        const response = await fetch("http://localhost:3000/person/details");
        const getPersonResult = await response.json();
        setPersonData(getPersonResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchExperience = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/experience/person/index`
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
          `http://localhost:3000/skills/person/index`
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
        const response = await fetch("http://localhost:3000/education/index");
        const getEducRes = await response.json();
        // setDegreeId(getEducRes.map(educ => educ.degreeId))
        setEducData(getEducRes);

        const degreeIds = getEducRes.map(educ => educ.degreeId)
        
        const fetchDegree = async () => {
            try {
              const response = await fetch(
                `http://localhost:3000/degree/index?ids=${degreeIds.join(",")}`
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
    const fetchCerts = async () =>{
        try {
          const response = await fetch(`http://localhost:3000/certification/person/index`);
          const getUserResult = await response.json();
          setCerts(getUserResult);
          // console.log(getUserResult)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      const fetchLicense = async () =>{
        try {
          const response = await fetch(`http://localhost:3000/license/person/index`);
          const getUserResult = await response.json();
          setLicense(getUserResult);
          // console.log(getUserResult)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchLicense()
  
    fetchCerts()
    fetchEducation();
    fetchSkills();
    fetchExperience();
    fetchPersonData();
    fetchUserData();
    // console.log(degree)
  }, []);

  // useEffect(()=>{
  //   const degreeIds = educData.map(educ => educ.degreeId)
  //   const fetchDegree = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:3000/degree/index?ids=${degreeIds.join(",")}`
  //         );
  //         const getUserResult = await response.json();
  //         setDegree(getUserResult);
  //         // console.log(getUserResult)
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchDegree();
  //     console.log(degreeIds)

  // },[educData])
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col items-center overflow-auto">
      <TopBar />
      <div className="overflow-auto-y w-9/12  bg-white h-fit mt-3 p-5 flex flex-col rounded-xl mb-20 gap-2">
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

        <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
          <span className="font-bold">Experience</span>
        </div>

        <div>
          {experience.map((experience) => (
            <div key={experience.id} className="flex flex-col mb-5">
              <span className="font-semibold">{experience.jobTitle}</span>
              <span className="">{experience.companyName}</span>
              {/* <p className="font-thin">{experience.jobDetails}</p> */}
              <ul className="list-disc ml-8 font-thin">
              {experience.jobDetails.split("\r\n").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
              <div className="flex flex-row gap-1">
                <span className="font-thin">
                  <DateToWords dateString={experience.startDate} />
                </span>
                <span className="font-thin">-</span>
                <span className="font-thin">
                  <DateToWords dateString={experience.endDate} />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
          <span className="font-bold">Skills</span>
        </div>

        <div className="pl-5">
          {/* <span className="font-normal">{skills.join(", ")}</span> */}
          <ul className="font-normal list-disc">
            {skills.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        </div>

        <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
          <span className="font-bold">Education</span>
        </div>

        <div>            
        {educData.map((education)=>(
          <div key={education.id} className='flex flex-col mb-5'>
              <span className='font-semibold'>{education.schoolName}</span>
              {degree.find((deg) => deg.id === education.degreeId) && (
              <span className=''>
                {
                  degree.find((deg) => deg.id === education.degreeId).degreeName
                }
              </span>
            )}
              <div className='flex flex-row gap-1'>
              <span className='font-thin'><DateToWords dateString={education.startDate} /></span>
              <span className='font-thin'>-</span>
              <span className='font-thin'><DateToWords dateString={education.endDate} /></span>
              </div>
              <span className='font-thin'>{"QPI: " +education.qpi}</span>
              <span className='font-thin'>{education.awards}</span>

          </div>
        ))}
        </div>

        <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
          <span className="font-bold">Licenses</span>
        </div>

        <div className="pl-5">
          {/* <span className="font-normal">{skills.join(", ")}</span> */}
          {/* <ul className="font-normal list-disc">
            {licenses.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul> */}
        </div>

        <div className="flex flex-row justify-center border-b-2 border-solid border-black mb-2">
          <span className="font-bold">Certifications</span>
        </div>

        <div className="pl-5">
          {/* <span className="font-normal">{skills.join(", ")}</span> */}
          <ul className="font-normal list-disc">
            {certs.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
