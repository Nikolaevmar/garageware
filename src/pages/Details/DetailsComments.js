import { useState } from "react"
import Profile from "../../components/Profile";
import { timestamp } from "../../firebase/config"
import {useAuthContext} from '../../hooks/useAuthContext'
import { useFirestore } from "../../hooks/useFirestore";

export default function DetailsComments({project}) {

    const {updateDocument, response} = useFirestore('projects');
    const [newComment, setNewComment] = useState('');
    const {user} = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const comment = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        await updateDocument(project.id, {
            comments: [...project.comments, comment]
        })
        if(!response.error){
            setNewComment('');
        }
    }

    return (
        <div className='project-comments'>
            <h4>Project comments</h4>
            <ul>
                {project.comments.length > 0 && project.comments.map((c) => (
                    <li key={c.id}>
                        <div className='comment-author'>
                            <Profile src={c.photoURL}/>
                            <p>{c.displayName}</p>
                        </div>
                        <div className='comment-date'>
                            <p>date</p>
                        </div>
                        <div className='comment-content'>
                            <p>{c.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form className='add-comment' onSubmit={handleSubmit}>
                <label>
                <span>Add new comment</span>
                 <textarea
                  required
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                 ></textarea>
                </label>
                <button className='btn'>Add comment</button>
            </form>
        </div>
    )
}
