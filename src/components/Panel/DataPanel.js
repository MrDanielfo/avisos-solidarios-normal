import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const DataPanel = ({ data: { id, title, category } }) => {
     // console.log(title)
     let idNotice = parseInt(id)
     return (
          <Fragment>
               <tr className="data-panel">
                    <td className="sombreado">{title}</td>
                    <td style={{ textTransform: "capitalize" }}>{category}</td>
                    <td className="opciones-avisos pagina-user">
                         <div className="contenedor-boton btn-editar">
                              <span>
                              <Link to={`/actualizar-aviso/${idNotice}`} className="texto-bordeado">
                                   Editar
                              </Link>
                              </span>
                         </div>
                         <div className="contenedor-boton btn-eliminar">
                              <span className="texto-bordeado">X</span>
                         </div>
                    </td>
               </tr>
          </Fragment>
     )
}

export default DataPanel;
