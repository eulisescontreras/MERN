import React, {Component} from 'react';

function addClient(state){
    alert(JSON.stringify(state));
    /*fetch('//localhost:3000/clients/add',
    {
        method: "POST"
    })
    .then(function(res){
        if(res.ok){
            res.json().then(json => {
                alert(JSON.stringify(json));
            });
        }
    })
    .catch(function(res){ 
        alert(res); 
    })*/
}

class AddClient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            phone: "",
            address: ""
        }
        this.handleChange = this.handleChange.bind(this);
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
                        <button className="btn btn-primary col-md-offset-1" onClick={() => addClient(this.state)}>Inser Data</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddClient