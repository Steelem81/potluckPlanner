import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';


const InvitationForm = (props) => {
    const eventId = props.eventId
    const setInvitations = props.setInvitations
    const [newInvitation, setNewInvitation] = useState()

    const inviteChangeHandler = (e) => {
        setNewInvitation({...newInvitation, [e.target.name]: e.target.value})
    }

    const inviteSubmitHandler =(e) => {
        e.preventDefault();
        axios.get(`http://localhost:8000/api/user/${newInvitation.invitedUserEmail}`, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                axios.post(`http://localhost:8000/api/${eventId}/invite`,{
                invitedToEvent: eventId,
                invitedUser: res.data._id,
                invitationStatus: 'pending'
                }, {withCredentials: true})
                .then(res => {
                    console.log(res)
                    setInvitations(invitations =>[...invitations, res.data])
                })
            })
            .catch(err=> console.log(err)) 
    }

    return (
        // <></>
        <>
        <div className="container">
            <form onSubmit={inviteSubmitHandler}>
                <h4>Enter email addresses to invite people</h4>
                    <div className="mb-3">
                        <input type="text" className="form-control" name="invitedUserEmail" onChange = {inviteChangeHandler}/>
                    </div>
                <button type="submit" className="btn btn-success">Invite</button>
            </form>
            </div>
        </>
    )
}

export default InvitationForm