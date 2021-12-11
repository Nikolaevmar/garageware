import './Profile.scss'

export default function Profile({ src }) {
    return (
        <div className='profile'>
            <img src={src} alt="profile-pic"/>
        </div>
    )
}
