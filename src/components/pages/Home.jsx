import React, {useContext, useEffect} from "react";
import AuthContext from "../../context/auth/AuthContext";

const Home = props => {
  const authContext = useContext(AuthContext);

  if(!localStorage.jwtToken){
    props.history.push('/login');
  }
  
  useEffect(()=>{
    authContext.setCurrentUser();
    //  eslint-disable-next-line
  },[]);

  const { user } = authContext;

  return (
    <div className="grid-2">
      <h1>Home</h1><br/>
      {user && <h1>Bienvenido {user.name}</h1>}
    </div>
  );
};

export default Home;
