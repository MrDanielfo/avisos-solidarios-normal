import React, { useState, useEffect } from 'react'
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Categories from './Categories';

const HomeCategories = ({ match }) => {
     // console.log(match.params.nombre)
     let categoryName = match.params.nombre

     const [avisos, setAvisos] = useState([]);
     const [consultar, setConsultar ] = useState(true)
     
     const token = localStorage.getItem('token');
     const headers = {
          'headers': {
               'Authorization': `Bearer ${token}`
          }
     }

     const getDataCategory = async () => {
          let respuestaCat;
          let categoryId;
          let dataCat;
          try {
               respuestaCat = await clienteAxios.get('/categories', headers)
               // console.log(respuestaCat.data);
               categoryId = respuestaCat.data.filter(cat => cat.name === categoryName)[0].id
               dataCat = await clienteAxios.get(`/notices/category/${categoryId}`, headers)
          } catch (err) {
               console.log(err)
               respuestaCat = []
               dataCat = []
          }

          setAvisos(dataCat.data)
          setConsultar(false)     
     }


     useEffect( () => {
          if (consultar) {
               getDataCategory();
          }

     }, [consultar]);
 
     return (
          <div className="contenedor-principal">
                <div className="contenedor-anuncios separador">
                    <h2 className="nombre-pagina texto-bordeado">Avisos de la categoria: {categoryName}</h2>
                    { 
                    avisos.length > 0 
                         ?
                         avisos.map(aviso => (
                         <Categories key={aviso.id} aviso={aviso} />
                         ))
                         :
                         <h1>No hay avisos para mostrar</h1>
                    }
                    
                </div>
          </div>
     )
}

export default withRouter(HomeCategories);

