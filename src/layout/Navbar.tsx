import { Link } from "react-router-dom";
import { userDataState } from '../atoms/userDataState';
import { useRecoilState } from 'recoil';

export default function Navbar() {
    const [userData, setUserData] = useRecoilState(userDataState);
    return (
        <>
            <nav className="navbar border-bottom" style={{backgroundColor: "#EEE"}}>
                <div className="container">
                    <a className="navbar-brand" href="/">Bits2Bytes</a>
                    <ul className="nav">
                        {
                            userData.loggedIn ? (
                                
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">Profile</Link>
                                    </li>
                                
                            ):

                        <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Signup</Link>
                        </li>
                        </>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}