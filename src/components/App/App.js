import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import SignUpContainer from '../SignUp/SignUpContainer';
import Login from '../Login/Login';
import CreateProfileForm from '../Profile/CreateProfileForm';
import Profile from '../Profile/Profile'
import MenuAppBar from '../NavBar/MenuAppBar';

// const Router = withRouter(Login);

function App() {
  return (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUpContainer} />
          <Route path="/profile/create" component={CreateProfileForm}/>
          <Route
            exact path="*"
            component={() => (
              <div>
                <MenuAppBar />
                <Route path="/profile/mypage" component={Profile}/>
              </div>
            )}
          />
        </Switch>
  );  
}

export default App;