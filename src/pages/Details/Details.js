import { useDocument } from '../../hooks/useDocument'
import { useParams } from 'react-router'

import './Details.scss'

export default function Details() {

    const { id } = useParams();
    const {error, document} = useDocument('projects', id)

    if(error){
        return <div className='error'>{error}</div>
    }

    if(!document){
        return <div className='loading'>Loading...</div>
    }

    return (
        <div className='project-details'>
            <h2>{document.name}</h2>
        </div>
    )
}
