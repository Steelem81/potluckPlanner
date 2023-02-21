import EventForm from './EventForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateEventForm = props => {
    const {id} = useParams();
    const numberOfInvites = props.numberOfInvitesProp;
    // let dishTotal = 0;
    const navigate = useNavigate();
    const [fieldValues, setFieldValues] = useState([])
    const [dishRatio, setDishRatio] = useState([])
    // const [dishRatioMessage, setDishRatioMessage] = useState([]);
    const [loaded, setLoaded] = useState(false);
    let dishTotals = Object.values(dishRatio).reduce((a,b)=> {return a+b}, 0);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/event/${id}`, {withCredentials: true})
            .then(res => {
                console.log(res)
                setFieldValues({
                    eventName: res.data.eventName,
                    eventDate: res.data.eventDate,
                    eventLocation: res.data.eventLocation,
                    eventDescription: res.data.eventDescription
                })
                setDishRatio(res.data.dishRatio)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    const eventChangeHandler = (e) => {
        setFieldValues({...fieldValues, [e.target.name]: e.target.value})
    }
    


    const dishChangeHandler=(e) => {
        setDishRatio({...dishRatio, [e.target.name]: Number(e.target.value)})

    }
    
    const eventSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/event/${id}`, {
            eventName: fieldValues.eventName,
            eventDate: fieldValues.eventDate,
            eventLocation: fieldValues.eventLocation,
            eventDescription: fieldValues.eventDescription,
            dishRatio: dishRatio
        }, {withCredentials: true})
            .then(res => {
                console.log(res);
                navigate("/main")
            })
            .catch(err => console.log(err))
    }

    return ( 
        <>
        { loaded === true ?
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
            {dishTotals > numberOfInvites ? 
            <h4>Too many dishes, Invite {Math.abs(numberOfInvites - dishTotals)} more people</h4>
            :dishTotals < numberOfInvites ? <h4>Add {Math.abs(numberOfInvites - dishTotals)} more dishes</h4>
            :<h4>Perfect balance of invitations and dishes!</h4>
            
            }
            {/* <h4>{numberOfInvites}</h4> */}
            <div className="row g-2 align-items-center">
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
            <input type="Submit" defaultValue="Update Event"/>
            </div>
        </form>
        </div>
        : <p>Loading...</p> }
        </>
    )

}

export default UpdateEventForm