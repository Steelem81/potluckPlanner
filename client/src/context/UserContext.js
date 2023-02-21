import { createContext,  useState }  from 'react';


const UserContext = createContext();

const UserContextProvider = props => {
    const [user, setUser] = useState({})
}