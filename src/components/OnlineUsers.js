import './OnlineUsers.scss'
import {useCollection} from '../hooks/useCollection'
import Profile from './Profile'

export default function OnlineUsers() {

    const {error, documents} = useCollection('users');

    return (
        <div className='user-list'>
            <h2>All Users</h2>
            {error && <div className='error'>{error}</div>}
            {documents && documents.map(user => (
                <div key={user.id} className='user-list-item'>
                    {user.online && <span className='status'></span>}
                    <span>{user.displayName}</span>
                    <Profile src={user.photoURL} />
                </div>
            ))}
        </div>
    )
}
