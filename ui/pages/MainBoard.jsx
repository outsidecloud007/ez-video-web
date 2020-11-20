import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'toasted-notes/src/styles.css';

import Home from './Intro.jsx'
import Programs from './Programs.jsx'
import Orders from './Orders.jsx'


export default class MainBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    componentWillMount() {

    }


    getNavbars() {
        return (
            <Navbar bg="primary" variant="dark" style={{
                backgroundImage: 'linear-gradient(to right, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)'
            }}>
                <Navbar.Brand href="#home" style={{marginRight:'0'}}>
                    <Image src="./pics/EZVideo3.png"
                        style={{
                            blockSize: '3em'
                        }} />
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#programs" style={{ color: 'white' }}>節目列表</Nav.Link>
                    <Nav.Link href="#orders" style={{ color: 'white' }}>訂閱列表</Nav.Link>
                </Nav>
            </Navbar>
        )
    }




    render() {
        let Navbars = this.getNavbars();
        return (
            <div>
                <Router>
                    {Navbars}
                    <Switch>
                        <Route path="/home" exact component={Home} />
                        <Route path="/programs" exact component={Programs} />
                        <Route path="/orders" exact component={Orders} />
                    </Switch>
                </Router>
            </div>
        );
    }
}