import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Autenticado from '../Autenticado';
import clienteAxios from '../../config/axios';

const AddCategory = ({ history, role }) => {

     const initialState = {
          name: ''
     }

     const [data, setFormData] = useState(initialState)

     const { name } = data;

     const onChange = e => setFormData({...data, [e.target.name]: e.target.value})

     const token = localStorage.getItem('token');
     const headers = {
          'headers': {
               'Authorization': `Bearer ${token}`
          }
     }


     const sendData = async e => {
          e.preventDefault()

          if (name.length <= 3) {
               return null;
          } else {
               const dataRequest = {name};
               // console.log(dataRequest);
               try {
                    let respuesta = await clienteAxios.post('/categories', dataRequest, headers);
                    if (respuesta.status === 200) {
                         history.push('/admin/categorias');
                    } 
               } catch (err) {
                    console.log(err);
               }
          }
     }

     if (role.role !== 'Admin37862') {
          history.push('/')
     }


     return (
          <Fragment>
               <div className="contenedor-principal">
                    <div className="contenedor-form form-register">
                         <h2 className="nombre-pagina texto-bordeado">Añade una categoría</h2>
                         <form className="login-registro" onSubmit={sendData}>
                              <div className="campo-form campo-adicional">
                                   <label htmlFor="nombre">Nombre de la Categoría</label>
                                   <input 
                                        type="text" 
                                        id="nombre" 
                                        className="input-form input-titulo"
                                        name="name"
                                        value={name}
                                        onChange={(e) => onChange(e)}
                                   />
                              </div>
                              <button type="submit" className="btn-general btn-register">Crear</button>
                         </form>
                    </div>
               </div>

          </Fragment>
     )
}

export default Autenticado(auth => auth)(withRouter(AddCategory));
