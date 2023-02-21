
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = props => {
    const navigate = useNavigate();
    const [fieldValues, setFieldValues] = useState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
    })
    const [errors, setErrors] = useState([])

    const onChangeHandler = (e) => {
        setFieldValues({...fieldValues,  [e.target.name]: e.target.value})
    };
    const handleRegistration = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', fieldValues, {withCredentials:true})
        .then(res => {
            console.log(res)
            navigate('/main')
        })
        .catch(err => {
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    return (
        <div className="container">
        <div className='p-3 m-2 border'>
        <h4>Register</h4>
        <form onSubmit={ handleRegistration }>
            <div className="mb-3">
            <input type='text' className="form-control" name='firstName' placeholder="First Name" onChange = {onChangeHandler}/>
            {(errors.firstName) ? <p className="text-danger">{errors.firstName.message}</p>: null}
            </div>
            <div className="mb-3">
            <input type='text' className="form-control" name='lastName' placeholder="Last Name" onChange = {onChangeHandler}/>
            {(errors.lastName) ? <p className="text-danger">{errors.lastName.message}</p>: null}
            </div>
            <div className="mb-3">
            <input type='text' className="form-control" name='email' placeholder="Email Address" onChange = {onChangeHandler}/>
            {(errors.email) ? <p className="text-danger">{errors.email.message}</p>: <p></p>}
            </div>
            <div className="mb-3">    

            <input type='password' className="form-control" name='password'p placeholder="Password" onChange = {onChangeHandler}/>
            {(errors.password) ? <p className="text-danger">{errors.password.message}</p>: null}
            </div>
            <div className="mb-3">

            <input type='password' className="form-control" name='confirmPassword' placeholder="Re-enter Password" onChange = {onChangeHandler}/>
            {(errors.confirmPassword) ? <p className="text-danger">{errors.confirmPassword.message}</p>: null}
            </div>
            <button type="submit" className='btn btn-secondary'>Register</button>
        </form>
    </div>
    </div>
    )
}

export default RegistrationForm;