import Projects from '../../components/Projects';
import ProjectFilter from './ProjectFilter';
import {useCollection} from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from 'react';

import './Dashboard.scss'

export default function Dashboard() {

    const [currentFilter, setCurrentFilter] = useState('all');
    const {documents, error} = useCollection('projects');
    const {user} = useAuthContext();

    const changeFilter = (newFilter) =>{
        setCurrentFilter(newFilter)
    }

    const projects = documents ? documents.filter((doc) => {
        switch(currentFilter){
         case 'All':
            return true
        case 'mine':
            let assignedToMe = false
            doc.assignedUsersList.forEach((u) => {
                if(user.uid === u.id){
                    assignedToMe = true
                }  
            })
            return assignedToMe
        case 'performance':
        case 'cosmetic':
        case 'functional':
            return doc.category === currentFilter
        default:
            return true
        }
    }) : null

    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>
            {error && <div className='error'>{error}</div>}
            {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
            {projects && <Projects projects={projects}/>}
        </div>
    )
}
