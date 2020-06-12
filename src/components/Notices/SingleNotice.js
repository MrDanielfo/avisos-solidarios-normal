import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

const SingleNotice = ({ auth, match }) => {
     const [aviso, setAviso] = useState([])
     const [consultar, setConsultar ] = useState(true)


     useEffect(() => {
          if (consultar) {
              
               clienteAxios.get(`/single/${match.params.id}`).then(respuesta => {
                    setAviso(respuesta.data)
                    setConsultar(false);
               })
               .catch(err => {
                    console.log(err);
               }) 
          }
     
     }, [consultar, match.params.id, aviso]);


     return (
          <div className="contenedor-principal">
               <div className="contenedor-anuncios separador formato-single">
                    { 
                         aviso !== undefined
                         ?
                         <Fragment>
                              <div className="contenedor-titulo-single">
                                   <h2 className="texto-bordeado">{aviso.title}</h2>
                              </div>
                              <div className={`contenedor-categoria-single ${aviso.category}`}>
                                   <h3>
                                   { auth.validToken 
                                        ?  
                                        <Link className="enlaces texto-bordeado" to={`/categorias/${aviso.category}`}>
                                             {aviso.category}
                                        </Link>
                                        :
                                        <span className="enlaces texto-bordeado single-page">
                                             {aviso.category}
                                        </span>
                              
                                   }
                                   </h3>
                              </div>
                              <div className="contenedor-titulo-single cuerpo-aviso">
                                   <p>{aviso.body}</p>
                              </div>
                              <div className="datos-autor">
                                   <span>{aviso.user}</span>
                                   <span className="email">{aviso.email}</span>
                              </div>
                         </Fragment>
                         :
                         ''
                    }
                    
               </div>
          </div>
     )
}

export default withRouter(SingleNotice);
