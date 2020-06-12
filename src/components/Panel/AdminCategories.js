import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Autenticado from '../Autenticado';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

const AdminCategories = ({history, role }) => {

     const token = localStorage.getItem('token');
     const headers = {
          'headers': {
               'Authorization': `Bearer ${token}`
          }
     }
     const [categorias, setCategorias] = useState([]);

     useEffect(() => {
          clienteAxios.get('/categories', headers)
               .then(res => {
                    setCategorias(res.data)
               })
     }, [])

     const deleteCategory = async id => {
          let question = await Swal.fire({
               position: 'center',
               icon: 'question',
               title: '¿Estás seguro que quieres eliminar la categoría?',
               showConfirmButton: true,
               showCancelButton: true
          })
          if (question.isConfirmed) {
               const response = await clienteAxios.delete(`/categories/${id}`, headers);
               if (response.status === 200) {
                    let nuevoTotal = categorias.filter(categoria => categoria.id !== id);
                    setCategorias(nuevoTotal);
               }   
          }
     }

     if (role.role !== 'Admin37862') {
          history.push('/')
     }

     if (categorias.length === 0 ) {
          return <h2>No hay categorías</h2>
     }

     return (
          <div className="contenedor-principal">
               <div className="contenedor-form contenedor-tabla padding-panel-admin">
                    <h2 className="nombre-pagina texto-bordeado">Administra todas las categorías</h2>

                    <div className="crear-categoria">
                         <span>
                              <Link to="/agregar-categoria">Crear Categoría</Link>
                         </span>
                    </div>
                    
                    
                    <table className="table-panel-admin">
                         <thead>
                              <tr className="heading-panel">
                                   <th>Categoría</th>
                                   <th className="texto-centrado">Opciones</th>
                              </tr>
                         </thead>

                         <tbody>
                         {
                                   categorias.map(categoria => {  
                                        let idCat = parseInt(categoria.id)
                                        return( 
                                             <tr key={categoria.id} className="data-panel">
                                                  <td className="sombreado" style={{ textTransform: "capitalize" }}>{categoria.name}</td>
                                                  <td className="opciones-avisos pagina-user">
                                                       <div className="contenedor-boton btn-editar">
                                                            <span>
                                                            <Link to={`/actualizar-categoria/${idCat}`} className="texto-bordeado">
                                                                 Editar
                                                            </Link>
                                                            </span>
                                                       </div>
                                                       <div onClick={() => deleteCategory(idCat)} className="contenedor-boton btn-eliminar">
                                                            <span className="texto-bordeado">X</span>
                                                       </div>
                                                  </td>
                                             </tr>
                                             )
                                        }
                                   )
                              } 
                         </tbody>
                    </table>
               </div>
          </div>
     )
}

export default Autenticado(auth => auth)(withRouter(AdminCategories));
