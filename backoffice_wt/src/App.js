import './App.css';
import {Switch, Route, Redirect, NavLink, BrowserRouter} from "react-router-dom";
import UsersView from "./Views/UsersView";
import ProvidersView from "./Views/ProvidersView";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <div className={'menu'}>
                  <h2>Watch Tracker Backoffice</h2>
                  <ul>
                      <li><NavLink to={'/users'} className={'menu-default'} activeClassName={'menu-active'}>Users</NavLink></li>
                      <li><NavLink to={'/providers'} className={'menu-default'} activeClassName={'menu-active'}>Providers</NavLink></li>
                      <li><NavLink to={'/reports'} className={'menu-default'} activeClassName={'menu-active'}>Reports</NavLink></li>
                  </ul>
              </div>
              <div className={'display'}>
                  <Switch>
                      <Route path={'/users'}><UsersView/></Route>
                      <Route path={'/providers'}><ProvidersView/></Route>
                      <Route path={'/reports'}></Route>
                      <Redirect exact from="/" to="users"/>
                  </Switch>
              </div>
          </BrowserRouter>
      </div>
  );
}

export default App;
