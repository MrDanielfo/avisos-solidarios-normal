import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Autenticado from '../Autenticado'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

function UserPanel({ auth }) {
     
     const token = localStorage.getItem('token');
     const headers = {
          'headers': {
               'Authorization': `Bearer ${token}`
          }
     }
     const [avisos, setAvisos] = useState([]);

     useEffect(() => {
          clienteAxios.get('/panel/user', headers)
               .then(res => {
                    // console.log(res)
                    setAvisos(res.data)
               })
     }, [headers])

     const deleteNotice = async (id) => {
          let question = await Swal.fire({
               position: 'center',
               icon: 'question',
               title: '¿Estás seguro que quieres eliminar el aviso?',
               showConfirmButton: true,
               showCancelButton: true
          })
          if (question.isConfirmed) {
               // console.log('Hola')
               const response = await clienteAxios.delete(`/notices/${id}`, headers);
               if (response.status === 200) {
                    let nuevoTotal = avisos.filter(aviso => aviso.id !== id);
                    setAvisos(nuevoTotal);
               }   
          }  
     }
     
     return (
          <div className="contenedor-principal">
               <div className="contenedor-form contenedor-tabla padding-panel-admin">
                    <h2 className="nombre-pagina texto-bordeado">Administrador de Avisos</h2>
                    {
                    avisos == null 
                    ?
                    <h3 style={{ fontSize: "2rem" }}>Aún no has compartido avisos</h3>
                    :
                    <table className="table-panel-admin">
                         <thead>
                              <tr className="heading-panel">
                                   <th>Aviso</th>
                                   <th>Categoría</th>
                                   <th className="texto-centrado">Opciones</th>
                              </tr>
                         </thead>

                         <tbody>
                              {
                                   avisos.map(aviso => {  
                                        let idNotice = parseInt(aviso.id)
                                        return( 
                                             <tr key={aviso.id} className="data-panel">
                                                  <td className="sombreado">{aviso.title}</td>
                                                  <td style={{ textTransform: "capitalize" }}>{aviso.category}</td>
                                                  <td className="opciones-avisos pagina-user">
                                                       <div className="contenedor-boton btn-editar">
                                                            <span>
                                                            <Link to={`/actualizar-aviso/${idNotice}`} className="texto-bordeado">
                                                                 Editar
                                                            </Link>
                                                            </span>
                                                       </div>
                                                       <div onClick={() => deleteNotice(idNotice)} className="contenedor-boton btn-eliminar">
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
                    }
               </div>
          </div>
     )
}

export default Autenticado(auth => auth)(withRouter(UserPanel))
