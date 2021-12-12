import { useState } from 'react'
import Select from 'react-select'
import './Create.scss'

export default function Create() {

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDuedate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedPeople, setAssignedPeople] = useState([]);

    const categories = [
        {value: 'performance', label: 'Performance'},
        {value: 'functional', label: 'Functional'},
        {value: 'cosmetic', label: 'Cosmetic'}
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, details,dueDate);
    }

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
                 <label>
                     <span>Assign to</span>
                    </label>
                 
                 <button className='btn'>Submit</button>
            </form>
        </div>
    )
}
