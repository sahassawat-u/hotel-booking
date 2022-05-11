import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './reverse.css'

const Reserve = ({setOpen, hotelId}) => {
    const [selectRooms, setSelectedRooms] = useState([])
    const {data, loading, error} = useFetch(`hotels/room/${hotelId}`)
    const {dates} = useContext(SearchContext)
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());
        let list = []

        while(data <= end) {
            list.push(new Date(date))
            date.setDate(date.getDate()+1)
        }
        return list
    }
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date=>
            allDates.includes(new Date(date).getTime()))
            return !isFound
        }
    
    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectRooms, value]: selectRooms.filter(item=>item !== value))
    }
   const navigate = useNavigate() 
   const handleClick = async() => {
    try {
    await Promise.all(selectRooms.map(roomId=>{
        const res = await axios.put("/rooms/availability/${roomId}", {dates:allDates});
        return res.data
    }))
    setOpen(false)
    navigate("/")
    } catch (error) {
        console.log(error)
    }
    }
    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark}
                className="rClose" onClick={()=>setOpen(false)}/>
                <span>Select your rooms:</span> 
                {data.map(item=>(
                    <div className='rItem'>
                        <div className='rItemInfo'>
                            <div className='rTitle'>{item.title}</div>
                            <div className='rDesc'>{item.desc}</div>
                            <div className='rMax'>Max people: <b>{item.maxPeople}</b></div>
                            <div className='rPrice'>{item.price}</div> 
                        </div>
                           {item.roomNumbers.map(roomNumber => (
                       <div className="room">
                               <label >{roomNumber.number}</label>
                               <input type="check" value={roomNumber._id} onChange={handleSelect}
                               disabled={!isAvailable(roomNumber)}/>
                           </div> 
                           ))}
                    </div>
                ))}
                <button onClick={handleClick}></button>
            </div>
        </div>
    )
}

export default Reserve