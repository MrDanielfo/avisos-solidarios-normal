import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SignOut from '../Auth/SignOut';


const NavbarUnAuth = () => (

     <ul>
          <li>
               <Link to="/login" className="enlaces texto-bordeado">
                    Login
               </Link>
          </li>
          <li>
               <Link to="/register" className="enlaces texto-bordeado">
                    Registrarse
               </Link>
          </li>
     </ul>  
)

const NavbarAuth = ({ role }) => { 
     return (
          <ul> 
               {
                    role.role === 'Admin37862'
                    ?
                    <Fragment>
                         <li>
                              <Link to="/admin" className="enlaces texto-bordeado">
                                   Admin Avisos
                              </Link>
                         </li>
                         <li>
                              <Link to="/admin/categorias" className="enlaces texto-bordeado">
                                   Admin Categorías
                              </Link>
                         </li>
                    </Fragment>
                    :
                    ''
               }
               <li>
                    <Link to="/user" className="enlaces texto-bordeado">
                         Mis Avisos
                    </Link>
               </li>
               <li>
                    <Link to="/agregar-aviso" className="enlaces texto-bordeado">
                         Crear Aviso
                    </Link>
               </li>
               <li>
                    <SignOut />
               </li>
          </ul>  
     )
}

const Navbar = ({auth, role}) => {
     // console.log(auth)
     return (
          <nav className="menu">
               {
                    auth.validToken
                    ?
                    <NavbarAuth role={role} />
                    :
                    <NavbarUnAuth />
                    
               }
          </nav> 
     )
}

export default withRouter(Navbar)
