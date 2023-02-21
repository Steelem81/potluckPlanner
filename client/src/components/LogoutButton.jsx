import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = props => {

    const navigate = useNavigate();

    const onClickHandler = (e) => {
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))

    }
    return(
        <button className="btn btn-primary" onClick={onClickHandler}>Log Out</button>
    )
}

export default LogoutButton