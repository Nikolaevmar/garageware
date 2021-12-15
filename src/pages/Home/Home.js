import './Home.scss'
import project from '../../assets/project.png'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='wrapper'>
           <div className='showcase-area'>
                <div className='left'>
                    <div className='big-title'>
                        <h1>Car project management simplified</h1>
                        <h3>For enthusiasts, from an enthusiast</h3>
                    </div>
                    <p className='text'>
                        Team up with your friends or colleagues and explore the best tool for managing your car projects. Аssign tasks, help out and keep track of your projects easily.
                    </p>
                    <Link to='/signup'> <button className='btn'>Get started</button> </Link>
                </div>
                <div className='right'>
                    <img src={project} className='logo' alt='garage-pic'/>
                </div>
            </div>
            </div>
    )
}
