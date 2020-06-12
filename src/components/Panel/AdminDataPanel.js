import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const AdminDataPanel = ({ history, data: { id, title, user, email, category } }) => {

     let idNotice = parseInt(id)

     const deleteNotice = async (id) => {
          let token = localStorage.getItem('token');
          const headers = {
               'headers': {
                    'Authorization': `Bearer ${token}`
               }
          }

          let question = await Swal.fire({
               position: 'center',
               icon: 'question',
               title: '¿Estás seguro que quieres eliminar el aviso?',
               showConfirmButton: true,
               showCancelButton: true
          })
          if (question.isConfirmed) {
               
               const response = await clienteAxios.delete(`/notices/${id}`, headers);
               if (response.status === 200) {
                     history.push('/')
               }
               
          }  
     }

     return (
          <Fragment>
               <tr className="data-panel">
                    <td className="sombreado">{title}</td>
                    <td>{user}</td>
                    <td className="sombreado">{email}</td>
                    <td style={{ textTransform: "capitalize" }}>{category}</td>
                    <td className="opciones-avisos">
                         <div onClick={() => deleteNotice(idNotice)} className="contenedor-boton btn-eliminar">
                              <span className="texto-bordeado">X</span>
                         </div>
                    </td>
               </tr>
          </Fragment>
     )
}

export default withRouter(AdminDataPanel);