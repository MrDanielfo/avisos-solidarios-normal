import React from 'react';
import { Link } from 'react-router-dom';

const Notice = ( { aviso, auth }) => {
     
     return (
          <div className="caja-anuncio">
               <div className="contenedor-titulo">
                    <h2>
                         <Link to={`/avisos/${aviso.id}`} className="enlaces">
                              {aviso.title}
                         </Link>
                    </h2>
               </div>
               <div className="contenedor-detalles">
                    <h3>{aviso.user}</h3>
                   
                    <div className={`contenedor-categoria ${aviso.category.toLowerCase()}`}>
                         <h4>
                              { auth.validToken 
                              ?  
                              <Link className="enlaces" to={`/categorias/${aviso.category}`}>
                                   {aviso.category}
                              </Link>
                              :
                              <span className="guest">
                                   {aviso.category}
                              </span>
                              
                              }
                         </h4>
                    </div>
                  
               </div>
          </div>
     )
}

export default Notice
