import React, { useEffect, useState } from 'react'
import ButtonNavigator from '../../components/ButtonNavigator'
import TopBar from '../../components/topbar'
import SideBar from '../../components/SideBar'
import DateToWords from '../../components/DateFormatter'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateEvent from './CreateEvent'
import ButtonPrimary from '../../components/ButtonPrimary'
import SidebarAdmin from '../../components/SidebarAdmin'
import DateConverter from '../../components/DateConverter'

const EventsDashboard = () => {
  const[eventsData,setEventsData] = useState([])

    useEffect(()=>{
          const fetchEventsData = async () => {
              try {
                const response = await fetch("http://localhost:3000/events/index");
                const getEventRes = await response.json();
                setEventsData(getEventRes);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
            fetchEventsData()
       },[])
  return (
     <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
       <SideBar/>
        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
            <div className="pt-5 pr-5 pl-3 overflow-x-auto">
           
                <table className="table bg-white rounded-xl mb-3">
                    <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Details</th>
                        <th>Partners</th>
                        <th>Event Date and Time</th>
                    </tr>
                    </thead>
                    <tbody>
                        {eventsData.map((event)=>(
                        <tr key={event.id} className='p-2  w-full align-center hover'>
                            <td>{event.eventName}</td>
                            <td><Link className="underline" to={`/eventdetails/${event.id}`}>View Details</Link></td>
                            <td><Link className="underline" to={`/event/partners/${event.id}`}>View Partners</Link></td>
                            <td><DateConverter isoString={event.eventDateTime}/></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <CreateEvent/>
              <ButtonPrimary text={"New Event"} onClick={()=>document.getElementById('new_event_form').showModal()}/>
                
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default EventsDashboard