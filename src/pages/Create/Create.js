import { useState } from 'react'
import {useCollection} from '../../hooks/useCollection'
import {useAuthContext} from '../../hooks/useAuthContext'
import {useFirestore} from '../../hooks/useFirestore'
import {useEffect} from 'react'
import {timestamp } from '../../firebase/config'
import {useNavigate} from 'react-router-dom' 
import Select from 'react-select'
import './Create.scss'

export default function Create() {

    const navigate = useNavigate();
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([]);
    const {user} = useAuthContext();
    const {addDocument, response} = useFirestore('projects');

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDuedate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedPeople, setAssignedPeople] = useState([]);
    const [formError, setFormError] = useState(null)

    const categories = [
        {value: 'performance', label: 'Performance'},
        {value: 'functional', label: 'Functional'},
        {value: 'cosmetic', label: 'Cosmetic'}
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        if(!category){
            setFormError('Please select a category')
            return
        }
        if(assignedPeople.length < 1){
            setFormError('Please assign at least one person')
            return
        }
        
        const assignedUsersList = assignedPeople.map((user) => {
            return {
                displayName: user.value.displayName,
                photoURL: user.value.photoURL,
                id: user.value.id
            }
        })

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }
        await addDocument(project);
        if(!response.error){
             navigate('/dashboard')
        }
    }

    useEffect(() => {
        if(documents){
            const options = documents.map(user => {
                return {value:user, label: user.displayName}
            })
            setUsers(options);
        }
    }, [documents])

    return (
        <div className='create-form'>
            <h2 className='page-title'>Add a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                 <span>Project name:</span>
                 <input
                 required
                 type='text'
                 onChange={(e) => setName(e.target.value)}
                 value={name}
                 />
                 </label>
                 <label>
                     <span>Project category</span>
                     <Select
                     onChange={(option) => setCategory(option)}
                     options={categories}
                     />
                    </label>
                    <label>
                     <span>Assign to</span>
                     <Select 
                     onChange={(option) => setAssignedPeople(option)}
                     options={users}
                     isMulti
                     />
                    </label> 
                <label>
                 <span>Project details:</span>
                 <textarea
                 required
                 type='text'
                 onChange={(e) => setDetails(e.target.value)}
                 value={details }
                 ></textarea>
                 </label>
                 <label>
                 <span>Set due date:</span>
                 <input
                 required
                 type='date'
                 onChange={(e) => setDuedate(e.target.value)}
                 value={dueDate}
                 />
                 </label>
                 <button className='btn'>Submit</button>
                 {formError && <div className='error'>{formError}</div>}
            </form>
        </div>
    )
}
