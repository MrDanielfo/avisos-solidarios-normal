import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Autenticado from '../Autenticado';
import clienteAxios from '../../config/axios';

const AddNotice = ({history }) => {
     const token = localStorage.getItem('token');
     const headers = {
          'headers': {
               'Authorization': `Bearer ${token}`
          }
     }

     const [dataCategories, setDataCategories] = useState([]);
     const { categories } = dataCategories;

     const initialState = {
          title: '',
          body: '',
          category: ''
     }

     const [data, setFormData] = useState(initialState)
     const { title, body, category } = data;
     const onChange = e => setFormData({...data, [e.target.name]: e.target.value})

     const [displayErrors, setDisplayErrors] = useState([])
     
     useEffect(() => {
          clienteAxios.get('/categories', headers).then(res => {
               setDataCategories({categories: res.data})
               //console.log(res)
          })
     }, [headers])

     if (categories === undefined || categories === '') {
          return null;
     }

     const sendData = async e => {
          e.preventDefault()
          const errorsArr = [];

          if (title.length <= 4) {
               errorsArr.push('El título de tu anuncio debe tener más de 4 caracteres')
          }

          if (body.length < 10 ) {
               errorsArr.push('El mensaje de tu anuncio debe tener más de 10 caracteres')
          }

          if (category ===  0 || category === '') {
               errorsArr.push('Debes seleccionar una categoría')
          }

          if (errorsArr.length > 0) {
               setDisplayErrors(errorsArr)
          }

          if (errorsArr.length === 0) {
               let category_id = parseInt(category);
               const dataRequest = {title, body, category_id};
               try {
                    let respuesta = await clienteAxios.post('/notices', dataRequest, headers);
                    if (respuesta.status === 200) {
                         history.push('/');
                    } 
               } catch (err) {
                    console.log(err);
               }
          } 
               
     }

     return (
          <Fragment>
               <div className="contenedor-principal">
                    <div className="contenedor-form form-register">
                         <h2 className="nombre-pagina texto-bordeado">Crea tu aviso</h2>
                         {
                              displayErrors.length > 0 && displayErrors.map((err, index) => {
                                   return (
                                        <div key={index} className="errors multi">{err}</div>
                                   )
                              })
                              
                         }
                         <form className="login-registro" onSubmit={sendData}>
                         <div className="campo-form campo-adicional">
                              <label htmlFor="titulo">Título</label>
                              <input 
                                   type="text" 
                                   id="titulo" 
                                   className="input-form input-titulo"
                                   name="title"
                                   value={title}
                                   onChange={(e) => onChange(e)}
                              />
                         </div>
                         <div className="campo-form campo-adicional">
                              <label htmlFor="categoria">Categoría</label>
                              <select 
                                   id="categoria" 
                                   className="input-form input-categoria mayusculas"
                                   name="category"
                                   onChange={(e) => onChange(e)}
                              >
                                   <option defaultValue>Selecciona categoría</option>
                                   {
                                        Object.values(categories).map( category => (
                                             <option key={category.id} value={category.id} >{category.name}</option>
                                        ))
                                   }
                                   
                              </select>
                         </div>
                         
                         <div className="campo-form campo-adicional">
                              <label htmlFor="mensaje">Mensaje</label>
                              <textarea 
                                   id="mensaje" 
                                   className="input-form input-cuerpo"
                                   name="body"
                                   value={body}
                                   onChange={(e) => onChange(e)}
                              ></textarea>
                         </div>
                         
                         <button type="submit" className="btn-general btn-register">Crear</button>
                    </form>
                    </div>
               </div>
          </Fragment>
     )
}

export default Autenticado(auth => auth)(withRouter(AddNotice));
