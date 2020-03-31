import React, { useContext, useState, useEffect } from "react";
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

const Login = props => {


 

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, error, isAuthenticated } = authContext;

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/');
    }

    if(error === 'User already exists'){
      alertContext.setAlert('User already exists', 'text-center alert-danger');
    }

    //  eslint-disable-next-line
  },[error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  
  const onSubmit = e => {
    e.preventDefault();

    if (email === "" || password === "") {
      alertContext.setAlert('Enter all fields', 'text-center alert-danger');

    } else{
      login({
        email, password
      })
    }
  };


  return (
    <div className="form-container">
      <h1>
        Account <span>Login</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={email} 
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Login"
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
