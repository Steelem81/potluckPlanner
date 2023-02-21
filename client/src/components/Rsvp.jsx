
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Rsvp = props => {
    const navigate = useNavigate();
    const invitationProp = props.invitationProp

    
    const [dish, setDish] = useState("")
    
    const onChangeHandler = (e) => {
        setDish(e.target.value)
    }
    
    const updateInvitation =(e)=> {
        e.preventDefault()
        // setDish(e.target.value)
        console.log(e)
        console.log(dish)
        axios.put(`http://localhost:8000/api/invitation/${invitationProp._id}/update`,{
            invitationStatus: 'Accepted',
            dish: dish
        }, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate("/main")
            })
            .catch(err => console.log(err))
    }

    return(
        <>
        <div className="container">
        <p>Event Name: {invitationProp.invitedToEvent.eventName}</p>
        <p>Event Date: {invitationProp.invitedToEvent.eventDate}</p>
        <p>Event Location: {invitationProp.invitedToEvent.eventLocation}</p>
        <p>Event Description{invitationProp.invitedToEvent.eventDescription}</p>
        <p>{invitationProp.invitedToEvent.dishRatio.main}</p>
        <form onSubmit={updateInvitation}>
            <select name="dish" className="form-select" onChange={onChangeHandler}>
                <option value="main">Main</option>
                <option value="side">Side</option>
                <option value="drinks">Drinks</option>
                <option value="dessert">Dessert</option>
            </select>
            <button type="submit" className="btn btn-success">RSVP</button>
        </form>
        </div>
        </>
    )
}

export default Rsvp;