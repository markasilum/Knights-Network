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
  const [filterStat, setFilterStat] = useState('upcoming')

    useEffect(()=>{
          const fetchEventsData = async () => {
              try {
                const response = await fetch("http://localhost:3000/events/index",{
                  credentials:'include'
                });
                const getEventRes = await response.json();
                setEventsData(getEventRes);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
            fetchEventsData()
       },[])

       const filteredEvents = filterStat === "upcoming"
       ? eventsData.filter(event => new Date(event.startDate) > new Date())
       : filterStat === "past"
           ? eventsData.filter(event => new Date(event.startDate) < new Date())
           : eventsData;
  return (
     <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
       <SideBar/>
        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
            <div className="pt-2 pr-2 overflow-x-auto">
            <div className="w-full h-fit min-h-80 p-3 rounded-xl mb-20 flex flex-col bg-white">
              <div className="flex flex-row gap-2 items-center pb-3 bg-white">
                <div className="font-thin ml-3">Status: </div>
                      <select
                          className="select select-bordered select-xs w-24 mt-2 max-w-xs font-thin"
                          defaultValue={filterStat}
                          onChange={(e) => {setFilterStat(e.target.value)}}
                      >
                        <option value="all">All</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                      </select>
                </div>

                <table className="table bg-white rounded-xl">
                    <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Details</th>
                        <th>Partners</th>
                        <th>Event Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.map((event)=>(
                        <tr key={event.id} className=' align-center hover'>
                            <td>{event.eventName}</td>
                            <td><Link className="underline" to={`/eventdetails/${event.id}`}>View Details</Link></td>
                            <td><Link className="underline" to={`/event/partners/${event.id}`}>View Partners</Link></td>
                            <td><DateConverter isoString={event.startDate}/></td>
                            
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
    </div>
  )
}

export default EventsDashboard