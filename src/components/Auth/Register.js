import React, { useState, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import clienteAxios from '../../config/axios';


function Register({ history, auth }) {

     const initialState = {
          name: '',
          lastname: '',
          email: '',
          password: '',
          passwordConfirm: ''
     }

     

     const [formData, setFormData ] = useState(initialState)
     const { name, lastname, email, password, passwordConfirm } = formData
     const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
     const [displayErrors, setDisplayErrors] = useState([])
     
     const sendData = async e => {
          e.preventDefault()
          const errorsArr = [];

          if (name.length <= 2 || lastname.length <= 2) {
               errorsArr.push('Nombre y apellido deben tener tres o más caracteres')
          }

          if (!email.includes('@')) {
               errorsArr.push('Debes introducir un email válido')
               
          }

          if (password.length < 6 || passwordConfirm !== password) {
               errorsArr.push('El password debe tener 6 o más caracteres y deben coincidir ambos campos')
          }

          if (errorsArr.length > 0) {
               setDisplayErrors(errorsArr)
          }

          if (errorsArr.length === 0) {
               const body = JSON.stringify({name, lastname, email, password}); 
               try {
                    const respuesta = await clienteAxios.post('/signup', body)
                    // console.log(respuesta);
                    if (respuesta.status === 200) {
                         history.push('/login');
                    } 
                    
               } catch (err) {
                    console.log(err)
                    errorsArr.push('Hubo un error en la petición')
               }  
          }
        
     }

     if(auth) {
          return <Redirect to="/"/>
      }
     
     // console.log(displayErrors)

     return (
          <Fragment>
               <div className="contenedor-principal">
                    <div className="contenedor-form form-register">
                         <h2 className="nombre-pagina texto-bordeado">Register</h2>
                         {
                              displayErrors.length > 0 && displayErrors.map((err, index) => {
                                   return (
                                        <div key={index} className="errors multi">{err}</div>
                                   )
                              })
                              
                         }
                         
                         <form className="login-registro" onSubmit={sendData}>
                              <div className="campo-form">
                                   <label htmlFor="name">Nombre</label>
                                   <input 
                                        type="text" 
                                        id="name" 
                                        className="input-form"
                                        name="name"
                                        autoComplete="no"
                                        value={name}
                                        onChange={e => onChange(e)}
                                   />
                              </div>
                              <div className="campo-form">
                                   <label htmlFor="lastname">Apellido</label>
                                   <input 
                                        type="text" 
                                        id="lastname" 
                                        className="input-form"
                                        name="lastname"
                                        autoComplete="no"
                                        value={lastname}
                                        onChange={e => onChange(e)}
                                   />
                              </div>
                              <div className="campo-form">
                                   <label htmlFor="email">Email</label>
                                   <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className="input-form" 
                                        autoComplete="no"
                                        value={email}
                                        onChange={e => onChange(e)}
                                   />
                              </div>
                              <div className="campo-form">
                                   <label htmlFor="password">Password</label>
                                   <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        className="input-form"
                                        value={password}
                                        onChange={e => onChange(e)}
                                   />
                              </div>
                              <div className="campo-form">
                                   <label htmlFor="passwordConfirm">Confirm Password</label>
                                   <input 
                                        type="password" 
                                        name="passwordConfirm" 
                                        id="passwordConfirm" 
                                        className="input-form"
                                        value={passwordConfirm}
                                        onChange={e => onChange(e)}
                                   />
                              </div>
                              
                              <button type="submit" className="btn-general btn-register">Regístrate</button>
                         </form>
                    </div>
               </div>
          </Fragment>
     )
}

export default withRouter(Register);

