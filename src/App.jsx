import 'styles/styles.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from 'pages/Login';
import Registro from 'pages/Registro';
import Index from 'pages/Index';
import Admin from 'pages/admin/Index';
import Productos from 'pages/admin/Productos';
import Ventas from 'pages/admin/Ventas';
import Usuarios from 'pages/admin/Usuarios';
import PublicLayout from 'layouts/PublicLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import AuthLayout from 'layouts/AuthLayout';
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContext } from 'context/userContext';
import { useState } from 'react';
import PrivateRoute from 'components/PrivateRoute';

function App() {
  const [userData, setUserData] = useState({})

  return (
    <Auth0Provider
    domain="astra-tic-empresa.us.auth0.com"
    clientId="IJ4ySwfpvIbKhXo64zBRurOwuo4w2CTI"
    redirectUri="https://radiant-escarpment-02424.herokuapp.com/admin"
    audience="api-autenticacion-astra-tic">

      <UserContext.Provider value={{userData, setUserData}}>
      <Router>
        <Switch>
          <Route path={['/admin', '/admin/productos', '/admin/ventas', '/admin/usuarios']}>
            <PrivateLayout>
              <Switch>
                <Route path='/admin/productos'>
                  <PrivateRoute roleList={['Administrador']}>
                    <Productos/>
                  </PrivateRoute>
                </Route>
                <Route path='/admin/ventas'>
                  <PrivateRoute roleList={['Administrador', 'Vendedor']}>
                    <Ventas/>
                  </PrivateRoute>
                </Route>
                <Route path='/admin/usuarios'>
                  <PrivateRoute roleList={['Administrador']}>
                    <Usuarios/>
                    </PrivateRoute>
                </Route>
                <Route path='/admin'>
                  <Admin/>
                </Route>
              </Switch>
            </PrivateLayout>
          </Route>
          <Route path={['/login', '/registro']}>
            <AuthLayout>
              <Switch>
                <Route path='/login'>
                  <Login/>
                </Route>
                <Route path='/registro'>
                  <Registro/>
                </Route>
              </Switch>
            </AuthLayout>
          </Route>
          <Route path={['/']}>
            <PublicLayout>
              <Switch>
                <Route path='/'>
                  <Index/>
                </Route>
              </Switch>
            </PublicLayout>
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
    </Auth0Provider>
  );
}

export default App;