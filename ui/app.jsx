import React from 'react';
import ReactDOM from 'react-dom';
import MainBoard from './pages/MainBoard.jsx'
import { PrivateRoute } from './components/PrivateRoute.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { BrowserRouter as Router, Route } from 'react-router-dom';


ReactDOM.render(
    <Router>
        <div>
            <PrivateRoute exact path="/" component={MainBoard} />
            <Route path="/login" component={LoginPage} />
        </div>
    </Router>
    ,
    document.getElementById('root')
);