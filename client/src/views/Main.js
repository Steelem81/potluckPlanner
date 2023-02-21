import LogoutButton from '../components/LogoutButton';
import EventListHosting from '../components/EventListHosting';
import { useNavigate } from 'react-router-dom';
import EventListInvited from '../components/EventListInvited';
import Information from '../components/Information'
const Main = () => {
    const navigate = useNavigate()

    
    const newEvent = (e) => {
        navigate('/event/new')
    }

    return (
        <div className="container-fluid">
            <h2>Plan your next get-together!!</h2>
            <div className="row">
                <div className="m-5 col-6">
                    <EventListHosting />
                    <EventListInvited />
                </div>
                <div className="col-4">
                    <Information />
                </div>
            </div>
        </div>
    )

}

export default Main;