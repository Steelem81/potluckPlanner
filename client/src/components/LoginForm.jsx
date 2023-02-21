import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginForm = props => {
    const navigate = useNavigate();
    const [fieldValues, setFieldValues] = useState({
            email: "",
            password: ""
    })
    const [error, setError] = useState([])

    const onChangeHandler = (e) => {
        setFieldValues({...fieldValues,  [e.target.name]: e.target.value})
    };

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', fieldValues, {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate('/main')
        })
        .catch(err => {
            console.log(err)
            setError(err.response.data)
        })
    }
    console.log(error)
    return (
        <>
        <div className="container">
        <div className="p-3 m-2 border">
            <form onSubmit = { handleLogin }>
                <h4>Login</h4>
                <div className="mb-3">
                {/* <label className="form-label" htmlFor="email">Email</label> */}
                <input type="text" className="form-control" name="email" placeholder="Email" onChange = {onChangeHandler}/>
                </div>
                <div className="mb-3">
                {/* <label className="form-label" htmlFor="password">Password</label> */}
                <input type="text" className="form-control" name="password" placeholder="Password" onChange = {onChangeHandler}/>
                </div>
                <div className="row">
                    <div className="col-auto">
                <button type="submit" className="btn btn-primary">Log In</button>       
                </div>
                <div className="col-auto">
                {error?<p className="text-danger">{error}</p>: null}
                </div>
                </div>
            </form>
        </div>
        </div>
        </>

    )
}

export default LoginForm;