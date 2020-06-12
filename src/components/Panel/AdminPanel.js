import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Autenticado from '../Autenticado';
import AdminDataPanel from './AdminDataPanel';

const AdminPanel = ({auth, role}) => {
     
     const [avisos, setAvisos] = useState([]);

     useEffect(() => {
          clienteAxios.get('/notices').then(respuesta => {
               setAvisos(respuesta.data)
          })
          .catch(err => {
               console.log(err);
          }) 
     }, []);

     if (role.role !== 'Admin37862') {
          return (
               <Redirect to='/' />
          )
     }

     return (
          <div className="contenedor-principal">
               <div className="contenedor-form contenedor-tabla padding-panel-admin">
                    <h2 className="nombre-pagina texto-bordeado">Administra todos los avisos</h2>
                    <table className="table-panel-admin">
                         <thead>
                              <tr className="heading-panel">
                              <th>Aviso</th>
                                   <th>Usuario</th>
                                   <th>Email</th>
                                   <th>Categoría</th>
                                   <th>Eliminar</th>
                              </tr>
                         </thead>

                         <tbody>
                              {
                                   avisos.length > 0
                                   ?
                                   avisos.map(aviso => <AdminDataPanel key={aviso.id} data={aviso} />)
                                   :
                                   <tr>
                                        <td>Sin avisos</td>
                                   </tr>

                              }
                         </tbody>
                    </table>
               </div>
          </div>
     )
}

export default Autenticado(auth => auth)(AdminPanel)
