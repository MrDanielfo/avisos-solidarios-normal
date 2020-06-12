import React from 'react'
import { Link } from 'react-router-dom';

const Categories = ({ aviso }) => {
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
                         <h4 className="enlaces cat-single">
                              {aviso.category}
                         </h4>
                    </div>
                  
               </div>
          </div>
     )
}

export default Categories
