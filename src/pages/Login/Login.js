import { useState } from "react";
import {useLogin} from '../../hooks/useLogin'
import './Login.scss';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isPending} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
  };

  return (
    <form onSubmit={handleSubmit} className='logForm'>
      <h2 className='logTag'>Login</h2>
      <label>
        <span>Email:</span>
      </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>
        <span>Password:</span>
      </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {!isPending &&<button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading...</button>} 
      {error && <p>{error}</p>}
    </form>
  );
}