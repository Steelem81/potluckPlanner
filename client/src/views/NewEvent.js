import EventForm from '../components/EventForm';



const NewEvent = () => {

    return(
        <>
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-6">
                        <EventForm />
                    </div>
                </div>
            </div>
            
            

        </>
    )

}

export default NewEvent;