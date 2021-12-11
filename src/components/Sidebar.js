import { NavLink } from 'react-router-dom';

import './Sidebar.scss';
import dashboardIcon from '../assets/dashboard_icon.svg'
import addIcon from '../assets/add_icon.svg'


export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='content'>
                <div className='user'>
                    {/* avatar&user */}
                    <h2>hey user</h2>
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
