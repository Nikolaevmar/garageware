import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import './Navbar.scss';
import wrenchIcon from '../assets/wrench.svg'

export default function Navbar() {
   
    const {user} = useAuthContext();
    const {logout, isPending} = useLogout();

    return (
        <div className="navbar">
            <ul>
                <li className='logo'>
                    <img src={wrenchIcon} className='logo' alt='wrench logo'/>
                    <Link to="/"><span>SoftGarage</span></Link>
                </li>
                <li>{!user && <Link to="/login">Login</Link>}</li>
                <li>{!user && <Link to="/signup">Signup</Link>}</li>
                {user && <li>
                    {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                    {isPending && <button className="btn" disabled>Logging out...</button>}
                </li>}
            </ul>
        </div>
    )
}
