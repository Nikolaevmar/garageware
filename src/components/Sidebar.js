import { NavLink } from 'react-router-dom';
import Profile from './Profile';
import {useAuthContext} from '../hooks/useAuthContext'

import './Sidebar.scss';
import dashboardIcon from '../assets/dashboard_icon.svg'
import addIcon from '../assets/add_icon.svg'



export default function Sidebar() {

    const {user} = useAuthContext();

    return (
        <div className='sidebar'>
            <div className='content'>
                <div className='user'>
                   <Profile src={user.photoURL}/>
                    <h2>Hey {user.displayName}</h2>
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink to='/dashboard'>
                                <img src={dashboardIcon} alt="dashboardIcon"/>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={addIcon} alt="addIcon"/>
                                <span>New project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
