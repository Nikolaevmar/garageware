import { useState } from 'react';
import { useSignup } from "../../hooks/useSignup";
import './Signup.scss'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [userImage, setuserImage ] = useState(null);
    const [userImageErr, setuserImageErr ] = useState(null);
    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName, userImage);
      };

    const handleFileChange = (e) => {
        setuserImage(null)
        let chosen = e.target.files[0];

        if(!chosen){
            setuserImageErr('Please select a file!')
            return;
        }

        if(!chosen.type.includes('image')){
            setuserImageErr('Please select an image file!')
            return;
        }

        if(chosen.size > 100000){
            setuserImageErr('Image file size must be less than 100kb')
            return;
        }
        setuserImageErr(null);
        setuserImage(chosen);
    }
    

    return (
        <form onSubmit={handleSubmit} className='signForm'>
      <h2 className='signTag'>Sign up</h2>
      <label>
        <span>Email:</span>
      </label>
      <input
        required
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>
        <span>Username:</span>
      </label>
      <input
        required
        type="text"
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
      />
      <label>
        <span>Password:</span>
      </label>
      <input
        required
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label>
        <span>User thumbnail:</span>
      </label>
      <input
        required
        type="file"
        onChange={handleFileChange}
      />
      {userImageErr && <div className='error'>{userImageErr}</div>}
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (<button className="btn" disabled>Loading...</button>)}
      {error && <div className='error'>{error}</div>}
    </form>
    )
}
