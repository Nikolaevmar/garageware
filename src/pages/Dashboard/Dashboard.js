import Projects from '../../components/Projects';
import './Dashboard.scss'

import {useCollection} from '../../hooks/useCollection'

export default function Dashboard() {

    const {documents, error} = useCollection('projects');

    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>
            {error && <div className='error'>{error}</div>}
            {documents && <Projects projects={documents}/>}
        </div>
    )
}
