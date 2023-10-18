import { Link, useNavigate } from 'react-router-dom';
import './LoginCard.css';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {app,googleProvider} from '../../../firebase.js';
import { signInWithPopup } from "firebase/auth";

const auth = getAuth(app);

const LoginCard = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate('/')
        } catch (error) {
          console.error(error);
        }
      };

    const handleGoogleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          navigate('/')
        } catch (error) {
          console.error(error);
        }
      };

    return ( 
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <div className="login__inputs">
                    <div className="email__input__container input__container">
                        <label className="email__label input__label">Email</label>
                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="email__input login__input" placeholder='example@gmail.com' />
                    </div>
                    <div className="password__input__container input__container">
                        <label className="password__label input__label" >Password</label>
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="password__input login__input" placeholder='**********'/>
                    </div>
                    <div className="login__button__container" style={{display:'flex',gap:'20px'}}>
                        <button className="login__button" onClick={submit}>LOGIN</button>
                        <button className="login__button" onClick={handleGoogleLogin}>Google</button>

                    </div>
                    
                </div>
                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">Don't have account? <Link to="/account/register">Create account</Link> </div>
                </div>
            </div>
        </div>
     );
}
 
export default LoginCard;