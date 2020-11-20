import React from 'react';
import { Jumbotron,Image } from 'react-bootstrap';
import { userService } from '../services/user.service.js';
import './login.css';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    // const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push({
                        pathname: "/",
                        search: "",
                        hash: "#/home",
                        state: undefined
                    });
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <>
                <Jumbotron className="jumb" style={{
                    height: '15em',
                    backgroundImage: 'linear-gradient(to right, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)'
                }}>
                    <Image 
                        src="./pics/EZVideo3.png"
                        style={{ 
                            position:'absolute',
                            width: '20%' }} 
                    />
                    <div className="wrapper fadeInDown">
                        <div id="formContent">

                            <div class="fadeIn first" >
                                <div id="formLogo">
                                    <a class="underlineHover" href="#">EZ-VIDEO</a>
                                </div>
                            </div>


                            <form onSubmit={this.handleSubmit}>
                                <input 
                                    type="text" 
                                    id="login" 
                                    class="fadeIn second" 
                                    name="username" 
                                    value={username} 
                                    onChange={this.handleChange} 
                                    placeholder="Account" />
                                <input 
                                    type="password" 
                                    id="password" 
                                    class="fadeIn third" 
                                    name="password" 
                                    value={password} 
                                    onChange={this.handleChange} 
                                    placeholder="Password" />
                                <input type="submit" class="fadeIn fourth" value="Log In" disabled={loading} />
                            </form>
                            <span class="fadeIn third" >請輸入任意帳號與密碼登入</span>
                            {error &&
                                <div className={'alert alert-danger'}>{error}</div>
                            }
                            {loading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }

                        </div>
                    </div>
                </Jumbotron>
            </>
        );
    }
}

export { LoginPage }; 