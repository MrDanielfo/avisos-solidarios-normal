import React from 'react';
import { Redirect } from 'react-router-dom';

const Autenticado = conditionFunc => Component => props => {

     const token = localStorage.getItem('token');

     return conditionFunc(token)
          ?
          <Component {...props} />
          :
          <Redirect to ="/login" />
}

export default Autenticado;
