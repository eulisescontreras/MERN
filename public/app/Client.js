import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Modal from 'react-modal';
import ClientAdd from './ClientAdd';


function deleteClient(member){
    fetch('//localhost:3000/clients/delete/'+member._id,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify({
            _id: member._id
        })
    })
    .then(function(res){
        console.log("Delete -> " + member._id);
    })
    .catch(function(res){ 
        console.log(res); 
    })

    return true;
};

class Client extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            showClientAdd: false
        }
        this.isEdit = false;
        this.member = null;
        this.addClient = this.addClient.bind(this);
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

    editClient(member,e){
        const currentState = this.state.showClientAdd;
        this.isEdit = true;
        this.setState({ showClientAdd: true });
        this.member = member;
    }

    addClient(){
        const currentState = this.state.showClientAdd;
        this.setState({ showClientAdd: !currentState }); 
        this.isEdit = false;
        this.member = null;
    }

    render() {
        return (
            <div>
                <div className="container">
                    <button className="btn btn-primary" style={{marginBottom: '10px'}} onClick={this.addClient}>Insert Data</button>
                </div>
                <div className="container"> 
                    <div className="panel panel-default p50 uth-panel">
                        <table className="table table-bordered table-striped">
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
                                    <td> 
                                        <button className="btn btn-warning col-md-offset-1" style={{marginRight: '10px'}} onClick={(e) => this.editClient(member,e)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => deleteClient(member) ? this.usersData() : null}>Delete</button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div key={this.member == null ? "" : this.member._id}>
                {
                      this.member == null ?
                      this.state.showClientAdd ? <ClientAdd isEdit={this.isEdit} member={this.member} usersData={this.usersData}/> : null :
                      <ClientAdd isEdit={this.isEdit} member={this.member} usersData={this.usersData}/>
                
                }
                </div>
            </div>
        );
    }
}


ReactDom.render(<Client />, document.getElementById('client'))