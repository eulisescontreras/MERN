import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Modal from 'react-modal';
import ClientAdd from './ClientAdd';


class Client extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            showClientAdd: false
        }
        this.showFields = this.showFields.bind(this);
        this.usersData = this.usersData.bind(this);
        {this.usersData()}
    }

    usersData() {
        let self = this;
        fetch('//localhost:3000/clients/list', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({clients: data});
        }).catch(err => {
            console.log('caught it!',err);
        })    
    }

    showFields(){
        const currentState = this.state.showClientAdd;
        this.setState({ showClientAdd: !currentState }); 
    }

    render() {
        return (
            <div>
                <div>
                    <button className="btn btn-primary col-md-offset-1" onClick={this.showFields}>Insert Data</button>
                </div>
                <div className="container"> 
                    <div className="panel panel-default p50 uth-panel">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.clients.map(member =>
                                <tr key={member._id}>
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.phone}</td>
                                <td>{member.address}</td>
                                <td><a>Edit</a>|<a>Delete</a></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                  { this.state.showClientAdd ? <ClientAdd usersData={this.usersData}/> : null }
                </div>
            </div>
        );
    }
}


ReactDom.render(<Client />, document.getElementById('client'))