import { useState } from 'react';
import { useSignup } from "../../hooks/useSignup";
import './Signup.scss'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [userImage, setuserImage ] = useState(null);

    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName, userImage);
      };
    

    return (
        <form onSubmit={handleSubmit} className='signForm'>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
      </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>
        <span>Username:</span>
      </label>
      <input
        type="text"
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
      />
      <label>
        <span>Password:</span>
      </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label>
        <span>User thumbnail:</span>
      </label>
      <input
        type="file"
        value={userImage}
      />
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (<button className="btn" disabled>Loading...</button>)}
      {error && <p>{error}</p>}
    </form>
    )
}
