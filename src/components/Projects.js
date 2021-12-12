import './Projects.scss' 

import { Link } from 'react-router-dom'
import Profile from './Profile'

export default function Projects({ projects }) {
    return (
        <div className='project-list'>
            {projects.length === 0 && <div>No projects yet!</div>}
            {projects.map((p) => (
                <Link to={`/details/${p.id}`} key={p.id}>
                    <h4>{p.name}</h4>
                    <p>Due by {p.dueDate.toDate().toDateString()}</p>
                    <div className='assigned-to'>
                       <ul>
                           {p.assignedUsersList.map((u) => (
                               <li key={u.photoURL}>
                                   <Profile src={u.photoURL}/>
                               </li>
                           ))}
                       </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}
