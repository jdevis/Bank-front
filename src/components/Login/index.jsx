import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useGetProfileQuery } from '../../services/api';
import './_login.scss';

// stay logged


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
  const { data: profile } = useGetProfileQuery(undefined, { skip: !token });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await login({ email: email.trim(), password: password.trim(), rememberMe }).unwrap();
      const accessToken = result.body?.token;
      if (!accessToken) throw new Error('Pas de token');
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('jwtToken', accessToken);
      navigate('/user');
    } catch (err) {
      console.error("Erreur de connaxion:", err);
    }
  };

  return (
    <main className='main bg-dark'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-wrapper'>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username'
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password'
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='input-remember'>
            <input type='checkbox' id='remember-me'
              onChange={(e) => setRememberMe(e.target.checked)} />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          {error && <p className="error-message">{error.data?.message || "Erreur de connexion"}</p>}
          <button className='sign-in-button'>Sign In</button>
        </form>
      </section>
    </main>
  )
}
export default Login


