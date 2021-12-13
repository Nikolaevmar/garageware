import Profile from '../../components/Profile'

export default function DetailsSummary({project}) {
    return (
        <div>
            <div className='project-summary'>
            <h2 className='page-title'>{project.name}</h2>
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
            </div>
        </div>
    )
}
