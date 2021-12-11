import {Link} from 'react-router-dom'
import {useLogout } from '../hooks/useLogout';

import './Navbar.scss';
import wrenchIcon from '../assets/wrench.svg'

export default function Navbar() {

    const {logout, isPending} = useLogout();

    return (
        <div className="navbar">
            <ul>
                <li className='logo'>
                    <img src={wrenchIcon} className='logo' alt='wrench logo'/>
                    <span>SoftGarage</span>
                </li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li>
                    {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                    {isPending && <button className="btn" disabled>Logging out...</button>}
                </li>
            </ul>
        </div>
    )
}
