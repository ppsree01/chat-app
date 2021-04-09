import Avatar from './Avatar';
import './Signin.css';

function Signin() {
    return (
        <div className="sign-in-box">
            <Avatar /><br />
            <input className="input" placeholder="Username" /><br />
            <input className="input" placeholder="Password" /><br />
            <button className="input btn">Login</button><br />
            <div className="body-text">Or</div><br />
            <button className="input btn signup">Sign Up</button>
        </div>
    )
}

export default Signin;