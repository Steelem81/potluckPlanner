import LogoutButton from '../components/LogoutButton';
import EventListHosting from '../components/EventListHosting';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventListInvited from '../components/EventListInvited';
import Information from '../components/Information'
import axios from 'axios'
const Main = () => {
    const navigate = useNavigate()
    const [invitationList, setInvitationList] = useState([])

    
    const newEvent = (e) => {
        navigate('/event/new')
    }

    useEffect(() => {
            axios.get('http://localhost:8000/api/user/invites', {withCredentials: true})
                .then(res=> {
                    console.log('Retrieved all events')
                    console.log(res.data)
                    setInvitationList(res.data)
                })
                .catch((err) => {
                    console.log('Something went wrong retrieving Events')
                    console.log(err)
                })
        }, [])

    const declineInvitation = (e, invitationId) => {
        console.log(invitationId)
        axios.put(`http://localhost:8000/api/invitation/${invitationId}/update`,{
            invitationStatus: "Declined"
        }, {withCredentials: true})
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container-fluid">
            <h2>Plan your next get-together!!</h2>
            <div className="row">
                <div className="m-5 col-6">
                    <EventListHosting />
                    <EventListInvited invitationListProp={invitationList} declineInvitationProp = {declineInvitation}/>
                </div>
                <div className="col-4">
                    <Information />
                </div>
            </div>
        </div>
    )

}

export default Main;