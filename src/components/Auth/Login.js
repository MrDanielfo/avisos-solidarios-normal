import React, { useState, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import clienteAxios from '../../config/axios';


function Login({ history, auth }) {

     const initialState = {
          email: '',
          password: ''
     }

     const [formData, setFormData ] = useState(initialState);
     const { email, password } = formData;
     const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
     const [errors, setErrors] = useState('')
     
     const sendData = async e => {
          e.preventDefault()

          if (email.length === 0 || password.length === 0) {
               setErrors('Debes proporcionar tus credenciales para iniciar sesión')
               return null;
          } else {
               const body = JSON.stringify({email, password});
               
               try {
                    const respuesta = await clienteAxios.post('/login', body)
                    if (respuesta.status === 200) {
                         localStorage.setItem('token', respuesta.data.token)

                         let token = localStorage.getItem('token');
                         const headers = {
                              'headers': {
                                   'Authorization': `Bearer ${token}`
                              }
                         }
                         const respuestaUsuario = await clienteAxios.get('/user/info', headers)
                    
                         if (respuestaUsuario.status === 200) {
                              if (respuestaUsuario.data.role === 'Admin') {
                                   localStorage.setItem('role', respuestaUsuario.data.role + "37862")
                              } else {
                                   localStorage.setItem('role', Math.random(400 * 1000))
                              }
                              history.push('/');
                              window.location.reload();
                         } 
                    }
                 
               } catch (err) {
                    // console.log(err)
                    setErrors('Las credenciales que proporcionaste no son correctas, verifica tu email y password')
                    localStorage.removeItem('token')
               }  
          }
     }

     if(auth.validToken) {
          return <Redirect to="/"/>
      }

     return (
          <Fragment>
               <div className="contenedor-principal">
                    <div className="contenedor-form form-login">
                         <h2 className="nombre-pagina texto-bordeado">Login</h2>
                         {
                              errors && <div className="errors">{errors}</div>
                         }
                         <form className="login-registro" onSubmit={sendData}>
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
                              
                              <button type="submit" className="btn-general btn-login">Iniciar Sesión</button>
                         </form>
                    </div>
               </div>
          </Fragment>
     )
}

export default withRouter(Login);
