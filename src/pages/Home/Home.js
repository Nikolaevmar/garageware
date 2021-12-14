import './Home.scss'
import project from '../../assets/project.png'
import facebook from '../../assets/facebook.png'
import github from '../../assets/github.png'
import instagram from '../../assets/instagram.png'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
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
            <footer className='footer'>
                 <a href="https://github.com/Nikolaevmar" target="_blank" rel="noreferrer noopener"><img src={github} className='icon' alt='icon'/></a>
                 <a href="https://www.facebook.com/profile.php?id=100015561824883" target="_blank" rel="noreferrer noopener"><img src={facebook} className='icon' alt='icon' /></a>
                 <a href="https://www.instagram.com/nikolaevvw/" target="_blank" rel="noreferrer noopener"><img src={instagram} className='icon' alt='icon'/></a>
             </footer>
        </div>
    )
}
