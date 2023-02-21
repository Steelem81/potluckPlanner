
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Rsvp from '../components/Rsvp';

const Invitation = () => {
    const {id} = useParams();
    const  [invitation, setInvitation] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/invite/${id}`, {withCredentials: true})
            .then(res => {
                console.log(res)
                setInvitation(res.data[0])
                setLoaded(true)
            })
            .catch(err => console.log({msg: "Issue getting invitation data", err:err}))
    }, [])
        console.log(invitation)
    return (
        <>
        {loaded?
            <Rsvp invitationProp={invitation}/>
        :<p>Loading...</p>
}
            </>
    )
}

export default Invitation;