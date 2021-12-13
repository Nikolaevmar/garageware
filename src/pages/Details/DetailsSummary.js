import {useFirestore} from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Profile from '../../components/Profile'

export default function DetailsSummary({project}) {

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const {deleteDocument} = useFirestore('projects');

    const handleClick = (e) => {
       deleteDocument(project.id)
       navigate('/dashboard')
    }

    return (
        <div>
            <div className='project-summary'>
            <h1 className='page-title'>{project.name}</h1>
            <p>By {project.createdBy.displayName}</p>
            <p className='due-date'>Project due by {project.dueDate.toDate().toDateString()}</p>
            <p className='details'>{project.details}</p>
            <h4>Project is assigned to:</h4>
            <div className='assigned-users'>
            {project.assignedUsersList.map((u) => (
                <div key={u.id}>
                    <Profile src={u.photoURL}/>
                </div>
            ))}
            </div>
            {user.uid === project.createdBy.id &&(
                <button className="btn" onClick={handleClick}>Mark as Complete</button>
            )}
            </div>
        </div>
    )
}
