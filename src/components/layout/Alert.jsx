import React, {useContext} from 'react'
import AlertContext from '../../context/alert/AlertContext';

const Alert = () => {

    const alertContext = useContext(AlertContext);

    const { alert } = alertContext;

    return (

        alert !== null && (
            <div style={{marginTop: "20px"}} className={`alert ${alert.type}`} role='alert'>{alert.msg}</div>
        )
        
    )
}

export default Alert;
