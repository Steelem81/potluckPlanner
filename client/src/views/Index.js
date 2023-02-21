import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import WelcomeText from '../components/WelcomeText';

const Index = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <WelcomeText/>
                </div>
                <div className="col-4">
                    <LoginForm/>
                    <RegistrationForm/>
                </div>
            </div>
        </div>
    )
    
}

export default Index;