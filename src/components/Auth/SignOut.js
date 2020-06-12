import React from 'react'
import { withRouter } from 'react-router-dom';

const handleSignOut = (history) => {
     localStorage.setItem('token', '');
     localStorage.setItem('role', '');
     history.push('/');
     window.location.reload();
}

const SignOut = ({ history }) => {
     return (
          <button className="btn-general texto-bordeado signout" onClick={() => handleSignOut(history)}>
               Salir
          </button>
     )
}

export default withRouter(SignOut)
