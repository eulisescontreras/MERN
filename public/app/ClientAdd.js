import React, {Component} from 'react';

function addClient(state,usersData){
    if(!state.isEdit)
    {
        fetch('//localhost:3000/clients/add',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name: state.name, 
                email: state.email, 
                phone: state.phone, 
                address: state.address
            })
        })
        .then(function(res){
            usersData();
        })
        .catch(function(res){ 
            console.log(res); 
        })
    }else
    {
        fetch('//localhost:3000/clients/update/'+state._id,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                name: state.name, 
                email: state.email, 
                phone: state.phone, 
                address: state.address,
                id: state._id
            })
        })
        .then(function(res){
            usersData();
        })
        .catch(function(res){ 
            console.log(res); 
        })
    }
}

class AddClient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:  props.member==null ? null : props.member.name,
            email:  props.member==null ? null : props.member.email,
            phone:  props.member==null ? null : props.member.phone,
            address:  props.member==null ? null : props.member.address,
            _id:  props.member==null ? null : props.member._id,
            isEdit: props.isEdit
        }
        this.handleChange = this.handleChange.bind(this);
        this.usersData = props.usersData;
    }

    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
     }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-control">Name</label>
                                        <input type="text" className="form-control" name="name" value={ this.state.name } onChange={ this.handleChange }/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-control">Email</label>
                                        <input type="email" className="form-control" name="email" value={ this.state.email } onChange={ this.handleChange }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-control">Phone</label>
                                        <input type="text" className="form-control" name="phone" value={ this.state.phone } onChange={ this.handleChange }/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-control">Address</label>
                                        <input type="text" className="form-control" name="address" value={ this.state.address } onChange={ this.handleChange }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary col-md-offset-1" onClick={() => addClient(this.state,this.usersData)}>Aceptar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddClient