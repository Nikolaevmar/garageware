import {Link} from 'react-router-dom'

import './Navbar.scss';
import wrenchIcon from '../assets/wrench.svg'

export default function Navbar() {
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
                    <button className="btn">Logout</button>
                </li>
            </ul>
        </div>
    )
}
