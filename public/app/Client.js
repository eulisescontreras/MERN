import React, {Component} from 'react';
import Modal from 'react-modal';

class Client extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: []
        }
    }

    usersData() {
        let self = this;
        fetch('//localhost:3001/clients', {
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

    render() {
        return (
        <div className="container"> 
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.clients.map(member =>
                        <tr key={member.id}>
                        <td>{member.name}</td>
                        <td>{member.picture}</td>
                        <td>{member.phone}</td>
                        <td>{member.address}</td>
                        <td><a>Edit</a>|<a>Delete</a></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}


ReactDom.render(<Client />, document.getElementById('client'))