import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventListHosting = props => {
    const [eventList, setEventList] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/api/events', {withCredentials: true})
            .then(res=> {
                console.log('Retrieved all events')
                console.log(res.data)
                setEventList(res.data.user.eventsHosting)
            })
            .catch((err) => {
                console.log('Something went wrong retrieving Events')
                console.log(err)
            })
    }, [])

    const cancelEvent=(e)=> {
        axios.delete(`http://localhost:8000/api/event/${e}/cancel`, {withCredentials: true})
        .then(res => {
            console.log(res)
            setEventList(eventList.filter(event => event._id !== e))
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <h3>Events you are hosting</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {eventList.map((event,index) => {
                        return (
                            <tr key={index}>
                                <td>{event.eventName}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.eventLocation}</td>
                                {event.invitations.length !== 0 ?
                                <td><button className="btn btn-success" onClick={() => navigate(`/event/${event._id}/update`)}>Edit</button></td>
                                :<td><button className="btn btn-success" onClick={() => navigate(`/event/${event._id}/update`)}>Send Invites</button></td>
                                }
                                <td><button className="btn btn-danger" onClick={() => cancelEvent(event._id)}>Cancel</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default EventListHosting;