import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'

const Header = ({auth, role }) => {
     // console.log(data);
     return (
          <header className="site-header">
               <div className="logo">
                    <h1>
                         <Link to={`/`} className="enlaces texto-bordeado">
                                   Avisos Solidarios
                         </Link> 
                    </h1>
               </div>
               <Navbar auth={auth} role={role} />
          </header>
     )
}

export default Header;
