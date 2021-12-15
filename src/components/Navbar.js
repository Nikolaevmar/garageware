import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import facebook from '../assets/facebook.png'
import github from '../assets/github.png'
import instagram from '../assets/instagram.png'


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
                    <Link to="/"><span>GarageWare</span></Link>
                </li>
                <li className='icons'>
                    <a href="https://github.com/Nikolaevmar" target="_blank" rel="noreferrer noopener"><img src={github} className='icon' alt='icon'/></a>
                    <a href="https://www.facebook.com/profile.php?id=100015561824883" target="_blank" rel="noreferrer noopener"><img src={facebook} className='icon' alt='icon' /></a>
                    <a href="https://www.instagram.com/nikolaevvw/" target="_blank" rel="noreferrer noopener"><img src={instagram} className='icon' alt='icon'/></a>
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
