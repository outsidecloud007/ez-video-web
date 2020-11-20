import React, { Component } from 'react';
import { Container, Row, Col, Card, Nav, Button, Table, Modal,Form,FormControl  } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import config from '../config.js';
import toaster from 'toasted-notes'
const request = require('request');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        var _this = this;
        this.getDBData().then((result) => {
            var data = JSON.parse(result.result)
            var newData = data.map((d,i)=>{
                    d.id=i
                    return d;
            });
            _this.setState({ data:newData })
        });
    }

    getDBData() {
        return new Promise((resolve, reject) => {
            fetch(config.url.programs, {
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

    getExpandRowView(title, data) {
        var _this = this;
        var littleRows = createLittleRows(data);
        return (
            <Row>
                <Col>
                    <Card className="shadow">
                        <Card.Header className="border-0">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h5 className="mb-0">{title}</h5>
                                </div>
                            </Row>
                        </Card.Header>
                        {littleRows}
                    </Card>
                </Col>
            </Row>
        );

        function createLittleRows(data) {
            return <Row className="align-items-center" style={{ margin: '3px' }}>
                    <div className="col" style={{ display: "inline-flex" }}>
                        <i class="far fa-file-alt"
                            style={{
                                marginLeft: '5px',
                                marginRight: '5px',
                                color: '#6b8cce'
                            }}></i>
                        <h6 className="mb-0">{data}</h6>
                    </div>
                </Row >
        }
    }

    onSubscribe(row){
        var _this = this;
        return new Promise((resolve, reject) => {
            var requestOptions = {
                uri:config.url.orderProgram,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                                "節目":row["節目"],
                                "頻道":row["頻道"],
                                "客戶":sessionStorage.getItem('user')
                            })
            };

            request(requestOptions, getResponse);

            function getResponse(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                    window.alert('訂閱成功')
                } else {
                    window.alert('訂閱失敗:'+error)
                    if (error) {
                        console.error(error)
                        reject(error);
                    } else {
                        reject('postRequest statusCode error:' +
                            response.statusCode + ' ,' + response.body);
                    }
                }
            }
        });
    }

    getTableView() {
        var _this = this;
        var headerStyle = {
            color: '#495057',
            backgroundColor: '#e9ecef',
            borderColor: '#dee2e6',
            textAlign: 'center',
            borderLeftWidth: '0px',
            borderRightWidth: '0px'
        }

        var style = {
            fontWeight: 'bold',
            backgroundColor: '#fff',
            textAlign: 'center'
        }

        var nameStyle = {
            fontWeight: 'bold',
            backgroundColor: '#fff',
            textAlign: 'center'
        }

        const expandRow = {
            onlyOneExpanding: true,
            renderer: row => (
                <div>
                    {_this.getExpandRowView('節目內容', row['內容'])}
                    <Button variant="primary"
                        onClick={function () {
                            return _this.onSubscribe(row)
                        }}
                        style={{ marginTop: '1em' }}
                    >
                        訂閱
                    </Button>
                </div>
            )
        };

        var columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true, headerStyle, style,
            
        },
        {
            dataField: '節目',
            text: '節目名稱', headerStyle, style: nameStyle
        }, {
            dataField: '頻道',
            text: '頻道', headerStyle, style
        }, {
            dataField: '描述',
            text: '描述', headerStyle, style
        }
        ]

        return (
            <div className="container"
                style={{ margin: 0, width: '100%', padding: 0, display: 'contents' }}>
                <BootstrapTable style={{ tableLayout: 'auto' }}
                    striped
                    hover
                    keyField='id'
                    data={this.state.data}
                    columns={columns}
                   expandRow={expandRow} 
                   />
            </div>
        );
    }

    showAlert(info) {
        toaster.notify(info, {
            duration: 5000,
            position: 'bottom'
        })
    }

    render() {
        var tableView = this.getTableView();
        return (
            <div>
                <Container className="mt--7" fluid>
                    <Row className="mt-5">
                        <Col className="mb-5 mb-xl-0" xl="12">
                            <Card className="shadow">
                                <Card.Header className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">節目列表</h3>
                                        </div>
                                    </Row>
                                </Card.Header>
                                {tableView}
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;