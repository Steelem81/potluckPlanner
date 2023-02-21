import { useState, useEffect } from 'react';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';

const EventForm = props => {
    const navigate = useNavigate()
    const [fieldValues, setFieldValues] = useState([])
    const [dishRatio, setDishRatio] = useState([])
    const [errors, setErrors] = useState([])


    const eventChangeHandler=(e) => {
        setFieldValues({...fieldValues, [e.target.name]: e.target.value})
    }

    const dishChangeHandler =(e) => {
        setDishRatio({...dishRatio, [e.target.name]: e.target.value})
    }

    const eventSubmitHandler = (e) => {
        e.preventDefault()
        console.log(dishRatio)
        setFieldValues({...fieldValues, [dishRatio]: dishRatio})
        console.log(fieldValues)
        axios.post('http://localhost:8000/api/event/new', {
            eventName: fieldValues.eventName,
            eventDate: fieldValues.eventDate,
            eventLocation: fieldValues.eventLocation,
            eventDescription: fieldValues.eventDescription,
            dishRatio: dishRatio
        }, {withCredentials: true})
        .then(res=> {
            console.log(res.data)
            navigate(`/main`)
        })
        .catch(err=> {
            console.log('Something went wrong creating new event')
            console.log(err)
            setErrors(err.response.data.errors)
        })
}

    return (
        <>
      <div className="container">
        <form onSubmit = {eventSubmitHandler}> 
            <label htmlFor="eventName" className="form-label">Event Name</label>
            <input type="text" className="form-control" value={fieldValues.eventName} name="eventName" onChange = {eventChangeHandler} />
            <label htmlFor="eventDate" className="form-label">Event Date</label>
            <input type="datetime-local" className="form-control" value={fieldValues.eventDate} name="eventDate" onChange = {eventChangeHandler} />
            <label htmlFor="eventLocation" className="form-label">Location</label>
            <input type="text" className="form-control" value={fieldValues.eventLocation} name="eventLocation" onChange = {eventChangeHandler} />
            <label htmlFor="eventDescription" className="form-label">Description</label>
            <input type="text" className="form-control" value={fieldValues.eventDescription} name="eventDescription" onChange = {eventChangeHandler} />
            {/* {dishTotal > numberOfInvites ? 
            <h4>Too many dishes, Invite {numberOfInvites - dishSum}</h4>
            :<h4>Add {numberOfInvites - dishSum} more dishes</h4> 
            } */}
            {/* <h4>{numberOfInvites}</h4> */}
            <div className="row g-2 align-items-center">
                <h4>Set how many of each dish type you'd like people to bring</h4>
                <div className="col-md-2">
                    <label htmlFor="main" className="form-label">Main</label>
                    <input type="number" className="form-control" value={dishRatio.main} name="main" onChange = {dishChangeHandler}/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="side" className="form-label">Side</label>
                    <input type="number" className="form-control" value={dishRatio.side} name="side" onChange = {dishChangeHandler}/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="drink" className="form-label">Drink</label>
                    <input type="number" className="form-control" value={dishRatio.drink} name="drink" onChange = {dishChangeHandler}/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="dessert" className="form-label">Dessert</label>
                    <input type="number" className="form-control" value={dishRatio.dessert} name="dessert" onChange = {dishChangeHandler}/>
                </div>
            <input type="Submit" defaultValue="Create Event"/>
            </div>
        </form>
        </div>
        </>
    )
}

export default EventForm;