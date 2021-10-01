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

function App() {
  return (
    <Router>
      <Switch>
        <Route path={['/admin', '/admin/productos', '/admin/ventas', '/admin/usuarios']}>
          <PrivateLayout>
            <Switch>
              <Route path='/admin/productos'>
                <Productos/>
              </Route>
              <Route path='/admin/ventas'>
                <Ventas/>
              </Route>
              <Route path='/admin/usuarios'>
                <Usuarios/>
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
  );
}

export default App;