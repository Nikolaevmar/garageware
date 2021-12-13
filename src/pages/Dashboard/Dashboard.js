import Projects from '../../components/Projects';
import ProjectFilter from './ProjectFilter';
import {useCollection} from '../../hooks/useCollection'

import './Dashboard.scss'

export default function Dashboard() {

    const {documents, error} = useCollection('projects');

    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>
            {error && <div className='error'>{error}</div>}
            {documents && <ProjectFilter/>}
            {documents && <Projects projects={documents}/>}
        </div>
    )
}
