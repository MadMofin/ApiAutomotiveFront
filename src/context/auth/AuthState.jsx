import React, {useReducer} from 'react';
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";
import * as jwt_decode from 'jwt-decode';

import axios from 'axios';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
  } from "../types";

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    }

    //Set Current User
    const setCurrentUser = async () => {
        
        console.log(`Bearer ${localStorage.getItem('jwtToken')}`)
        const config = {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`
            }
        };

        if (localStorage.jwtToken) {
          setAuthToken(localStorage.jwtToken);
        }

        try {
          const res = await axios.get("http://localhost:5000/api/v1/auth/me",config);
          dispatch({
            type: USER_LOADED,
            payload: res.data.data
          });
        } catch (err) {
          dispatch({
            type: AUTH_ERROR
          });
        }
      };

    //Register User
    const register = async formData =>{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };

        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/register', formData, config);
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = await jwt_decode(token);
            setCurrentUser(decoded);
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
        } catch (error) {
            dispatch({type: REGISTER_FAIL, payload: error.response.data.msg});
        }
    };

    // Logout
    const logout = () => dispatch({type: LOGOUT});

    //Login User
    const login = async formData =>{
        const config = {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`
            }
        };


        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/login', formData, config);
            
            const { token } = res.data;

            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = await jwt_decode(token);
            setCurrentUser(decoded);

            dispatch({ type: LOGIN_SUCCESS, payload: res.data });


        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
        }
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (

        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                register,
                login,
                setCurrentUser,
                logout
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
