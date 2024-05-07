import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topbar'
import SideBar from '../../components/SideBar'
import { Link } from 'react-router-dom'
import DateConverter from '../../components/DateConverter'
import ButtonPrimary from '../../components/ButtonPrimary'
import ButtonNavigator from '../../components/ButtonNavigator'

const SurveyDashboard = () => {
    const[surveyData,setSurveyData] = useState([])

  useEffect(()=>{
    const getSurveyIndex = async () =>{
        try {
            const response = await fetch("http://localhost:3000/survey/index", {
                credentials:'include'
              })

             const responseData = await response.json() 
             setSurveyData(responseData)
        } catch (error) {
            
        }
    }

    getSurveyIndex()
  },[])
  


  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
       <SideBar/>
        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
            <div className="pt-2 pr-2 overflow-x-auto">
            <div className="w-full h-fit min-h-80 p-3 rounded-xl mb-20 flex flex-col bg-white">
             
                <table className="table bg-white rounded-xl">
                    <thead>
                    <tr>
                        <th>Survey Name</th>
                        <th>Details</th>
                        <th>Answers</th>
                        <th>Date Created</th>
                    </tr>
                    </thead>
                    <tbody>
                        {surveyData.map((survey)=>(
                        <tr key={survey.id} className=' align-center hover'>
                            <td>{survey.name}</td>
                            <td><Link className="underline" to={`/surveys/details/${survey.id}`}>View Questions</Link></td>
                            <td><Link className="underline" to={`/survey/partners/${survey.id}`}>View Answers</Link></td>
                            <td><DateConverter isoString={survey.dateCreated}/></td>
                            
                        </tr>
                        ))} 
                        
                    </tbody>
                </table>
             <div className='mt-3 w-full flex justify-end'>
             <ButtonNavigator text={"New Survey"} path={"/surveys/create"}/>
             </div>
              
                
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyDashboard