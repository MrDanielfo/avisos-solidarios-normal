import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Session from './components/Session';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Homepage from './components/Homepage';
import SingleNotice from './components/Notices/SingleNotice';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserPanel from './components/Panel/UserPanel';
import AddNotice from './components/Notices/AddNotice';
import UpdateNotice from './components/Notices/UpdateNotice';
import AdminPanel from './components/Panel/AdminPanel';
import AddCategory from './components/Categories/AddCategory';
import AdminCategories from './components/Panel/AdminCategories';
import UpdateCategory from './components/Categories/UpdateCategory';
import HomeCategories from './components/Categories/HomeCategories';

const Root = () => {
  const [validToken, setValidToken] = useState(false)
  const [role, setRole] = useState('')

  const setToken = (value) => {
      setValidToken({validToken: value})
  }

  const setStatus = (value) => {
    setRole({role: value})
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(true)
    }

    if (localStorage.getItem('role')) {
      setStatus(localStorage.getItem('role'))
    }
  }, [])


  return (
     <Fragment>
        <div className="wrapper">
            <Router>
              <Header auth={validToken} role={role} />
                <Switch>
                  <Route exact path="/" render={() => <Homepage auth={validToken} />} />
                  <Route exact path="/avisos/:id" render={() => <SingleNotice auth={validToken} />} />
                  <Route exact path="/login" render={() => <Login auth={validToken} />} />
                  <Route exact path="/register" render={() => <Register auth={validToken} />} />
                  <Route exact path="/user" render={() => <UserPanel auth={validToken} />} />
                  <Route exact path="/admin" render={() => <AdminPanel auth={validToken} role={role} />} />
                  <Route exact path="/agregar-aviso" render={() => <AddNotice auth={validToken} />} />
                  <Route exact path="/actualizar-aviso/:id" render={() => <UpdateNotice auth={validToken} />} />
                  <Route exact path="/admin/categorias" render={() => <AdminCategories auth={validToken} role={role} />} />
                  <Route exact path="/agregar-categoria" render={() => <AddCategory auth={validToken} role={role} />} />
                  <Route exact path="/actualizar-categoria/:id" render={() => <UpdateCategory auth={validToken} role={role} />} />
                  <Route exact path="/categorias/:nombre" render={() => <HomeCategories auth={validToken}  />} />
                </Switch>
              <Footer />
            </Router>
        </div>
      </Fragment>
  );
}

const RootSession = Session(Root)

export default RootSession;
