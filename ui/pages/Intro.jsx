import React, { Component } from 'react';
import { Jumbotron ,Image} from 'react-bootstrap';
import config from '../config.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            version: ''
        }
    }

    componentWillMount() {
        var _this = this;
        this.getVersion().then((result) => {
           var version = result.result;
            _this.setState({ version })
        });
    }

    getVersion(){
        return new Promise((resolve, reject) => {
            fetch(config.url.version, {
                method: 'GET'
            }).then((response) => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    console.error(response);
                    reject(response.status + ' ' + response.statusText);
                }
            })
        });
    }

    getJumbotron() {
        return (
            <Jumbotron style={{
                // height: '13em',
                paddingLeft: '2em',
                paddingRight: '2em',
                paddingTop: '1em',
                marginBottom: '1em'
            }}>
                <div>
                <Image src="./pics/EZVideo3.png"  style={{
                    display:'inline-block'
                }}/>
                 <h1
                 style={{
                    display:'inline-block'
                }}
                 >{`版本:${this.state.version}`}</h1>
                </div>
            </Jumbotron>
        );
    }

    render() {
        return (
            <div>
                {this.getJumbotron()}
            </div>
        );
    }
}

export default App;