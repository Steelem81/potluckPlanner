
import LogoutButton from './LogoutButton'

const Navbar=()=> {

    return (
        <div className="container-fluid">
        <div className="p-2 bg-secondary text-light">
            <div className="row justify-content-between">
                <div className="col-4">
                    <h1><a href="/main" className="text-light">Potluck Planner</a></h1>
                </div>
            <div className="col-4">
                <nav className="nav nav-pills justify-content-end">
                    <a className="nav-link text-light" href="/main">Home</a>
                    <a className="nav-link text-light" href="/event/new"> New Event</a>
                    <LogoutButton/>   
                </nav>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Navbar;