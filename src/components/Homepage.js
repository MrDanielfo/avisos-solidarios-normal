import React, { useState, useEffect } from 'react'
import clienteAxios from '../config/axios';

import Notice from './Notices/Notice';

const Homepage = ({ auth }) => {

     const [avisos, setAvisos] = useState([]);
     const [consultar, setConsultar ] = useState(true)

     useEffect(() => {
     if (consultar) {

          clienteAxios.get('/notices').then(respuesta => {
               setAvisos(respuesta.data)
               setConsultar(false);
          })
          .catch(err => {
               console.log(err);
          }) 

     }

     }, [consultar]);


     return (
          <div className="contenedor-principal">
                <div className="contenedor-anuncios separador">
                  { avisos.length > 0 
                    ?
                      avisos.map(aviso => (
                        <Notice key={aviso.id} aviso={aviso} auth={auth} />
                      ))
                    :
                    <h1>No hay avisos para mostrar</h1>
                    }
                    
                </div>
          </div>
     )
}

export default Homepage
