import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Modal from 'react-modal';
import ClientAdd from './ClientAdd';


function deleteClient(id){
    fetch('//localhost:3000/clients/delete/' + id,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify({
            id: id
        })
    })
    .catch(function(res){ 
        Console.log(res); 
    })
};

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
                <div className="container">
                    <button className="btn btn-primary" style={{marginBottom: '10px'}} onClick={this.showFields}>Insert Data</button>
                </div>
                <div className="container"> 
                    <div className="panel panel-default p50 uth-panel">
<<<<<<< HEAD
                        <table className="table table-striped table-bordered">
=======
                        <table className="table table-bordered">
>>>>>>> 03be3556341a9806a29b0af97ef6dbd4cab2d346
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
<<<<<<< HEAD
                                <td> 
                                    <button className="btn btn-warning" style={{marginRight: '6px'}} onClick={this.showFields}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteClient(member._id)}>Delete</button>
                                </td>
=======
                                <td><button className="btn btn-warning col-md-offset-1" onClick={this.showFields}>Edit</button><button className="btn btn-danger col-md-offset-1" onClick={this.showFields}>Delete</button></td>
>>>>>>> 03be3556341a9806a29b0af97ef6dbd4cab2d346
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