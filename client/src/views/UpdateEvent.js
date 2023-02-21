
import UpdateEventForm from '../components/UpdateEventForm';
import EventForm from '../components/EventForm';
import InvitedList  from '../components/InvitedList';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import InvitationForm from '../components/InvitationForm';

const UpdateEvent = () => {
    const {id} = useParams();

    const [invitations, setInvitations] = useState([])
    const [fieldValues, setFieldValues] = useState()
    const [newInvitation, setNewInvitation] = useState()
    const [dishCount, setDishCount] = useState([])

    let dishTotals = Object.values(dishCount).reduce((a,b)=> {return a+b}, 0);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/event/${id}`, {withCredentials: true})
            .then(res => {
                console.log(res)
                setFieldValues(res.data)
                setInvitations(res.data.invitations)
                setDishCount(res.data.dishRatio)
                
            })
            .catch(err => console.log(err))
    }, [])

    console.log(dishTotals)
    const numberOfInvites = invitations.length;
    console.log(invitations)
    return(
        <>
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-6">
                        <UpdateEventForm numberOfInvitesProp={numberOfInvites} dishCountProp={dishCount} setDishCountProp={setDishCount} />
                    </div>
                    <div className="col-4">
                        <InvitationForm eventId = {id} setInvitations={setInvitations}/>
                        <InvitedList invitationsProp = {invitations}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateEvent;