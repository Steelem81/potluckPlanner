import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventListInvited = props => {
    // const [invitationList, setInvitationList] = useState([])
    const navigate = useNavigate();
    const invitationList = props.invitationListProp
    const declineInvitation = props.declineInvitationProp
    console.log(props)
    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/user/invites', {withCredentials: true})
    //         .then(res=> {
    //             console.log('Retrieved all events')
    //             console.log(res.data)
    //             setInvitationList(res.data)
    //         })
    //         .catch((err) => {
    //             console.log('Something went wrong retrieving Events')
    //             console.log(err)
    //         })
    // }, [])

    // const declineInvitation = (e, invitationId) => {
    //     console.log(invitationId)
    //     axios.put(`http://localhost:8000/api/invitation/${invitationId}/update`,{
    //         invitationStatus: "Declined"
    //     }, {withCredentials: true})
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(err => console.log(err))
    // }

    return (
        <>
        <h3>Events you are invited to</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>You are Bringing</th>
                        <th>RSVP</th>
                        <th>Decline</th>
                    </tr>
                </thead>
                <tbody>
                    {invitationList.map((invitation,index) => {
                        return (
                            <tr key={index}>
                                <td>{invitation.invitedToEvent.eventName}</td>
                                <td>{invitation.invitedToEvent.eventDate}</td>
                                <td>{invitation.invitedToEvent.eventLocation}</td>
                                <td>{invitation.dish}</td>
                                {invitation.invitationStatus == 'pending' ?
                                <td><button className="btn btn-success" onClick={()=>{navigate(`/invitation/${invitation._id}/update`)}}>Accept</button></td>
                                : <td><button className="btn btn-primary" onClick={()=>{navigate(`/invitation/${invitation._id}/update`)}}>Update</button></td>
                                }
                                {invitation.invitationStatus !== 'Declined' ?
                                <td><button className="btn btn-danger" onClick={(e)=> declineInvitation(e, invitation._id)}>Decline</button></td>
                                : <td><button className="btn btn-primary" onClick={()=>{navigate(`/invitation/${invitation._id}/update`)}}>Undo Decline</button></td>}
                                

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default EventListInvited;