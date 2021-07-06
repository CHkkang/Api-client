import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import SignUpContainer from '../SignUp/SignUpContainer';
import Login from '../Login/Login';
import CreateProfileForm from '../Profile/CreateProfileForm';
import Profile from '../Profile/Profile'

// const Router = withRouter(Login);

function App() {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUpContainer}/>
      <Route path="/profile/create" component={CreateProfileForm}/>
      <Route path="/profile/mypage" component={Profile}/>
    </div>
  );  
}

export default App;