import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Autenticado from '../Autenticado';
import clienteAxios from '../../config/axios';

const UpdateCategory = ({ history, role, match }) => {

     const token = localStorage.getItem('token');
     const headers = {
          'headers': {
               'Authorization': `Bearer ${token}`
          }
     }
     const categoryId = parseInt(match.params.id);

     const [categorias, setCategorias] = useState([]);
     
     /* Traer categoría */
     useEffect(() => {

          clienteAxios.get(`/categories`, headers)
          .then(respuesta => {
               setCategorias(respuesta.data)
          })
          .catch(err => {
               console.log(err);
          }) 
     }, [])

     const initialState = {
          name: ''
     }

     const [data, setFormData] = useState(initialState)

     const { name } = data;

     const onChange = e => setFormData({...data, [e.target.name]: e.target.value})

     const sendData = async e => {
          e.preventDefault()

          if (name.length <= 3) {
               return null;
          } else {
               const dataRequest = {name};
               
               try {
                    let respuesta = await clienteAxios.put(`/categories/${categoryId}`, dataRequest, headers);
                    if (respuesta.status === 200) {
                         history.push('/admin/categorias');
                    } 
               } catch (err) {
                    console.log(err);
               }
          }
     }

     let categoria = categorias.filter( cat => cat.id === categoryId)

     if (categoria[0] === undefined) {
          return null;
     }
    
     if (role.role !== 'Admin37862') {
          history.push('/')
     }


     return (
          <Fragment>
               <div className="contenedor-principal">
                    <div className="contenedor-form form-register">
                         <h2 className="nombre-pagina texto-bordeado">Actualiza categoría</h2>
                         <form className="login-registro" onSubmit={sendData}>
                              <div className="campo-form campo-adicional">
                                   <label htmlFor="nombre">Nombre de la Categoría</label>
                                   <input 
                                        type="text" 
                                        id="nombre" 
                                        className="input-form input-titulo"
                                        name="name"
                                        value={name}
                                        placeholder={categoria[0].name}
                                        onChange={(e) => onChange(e)}
                                   />
                              </div>
                              <button type="submit" className="btn-general btn-update">Actualizar</button>
                         </form>
                    </div>
               </div>

          </Fragment>
     )
}

export default Autenticado(auth => auth)(withRouter(UpdateCategory));
