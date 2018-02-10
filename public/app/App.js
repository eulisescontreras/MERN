import React, {Component} from 'react'
import ReactDom from 'react-dom'
import {FacebookLoginButton, TwitterLoginButton} from 'react-social-login-buttons'

const wellStyles = { maxWidth: 400, margin: '200px auto 10px' };

const buttonsInstance = (
    <div className="well" style={wellStyles}>
      <FacebookLoginButton text="Sign In with Facebook" onClick={() => loginWithFacebook()} />
      <TwitterLoginButton text="Sign In with Twitter"  onClick={() => loginWithTweeter()} />
    </div>
  );

  
function loginWithFacebook()
{
  
  /*fetch('//localhost:3000/login/facebook',
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET"
  })*/
  window.location = "//localhost:3000/clients";
  /*.then(function(res){
    if(res.ok){
      res.json().then(json => {
        alert(JSON.stringify(json));
      });
    }
  })*/
  /*.catch(function(res){ 
    alert(res); 
  })*/
}

function loginWithTweeter()
{
  /*fetch('//localhost:3001/login/tweeter',
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET"
  })*/
  /*.then(function(res){
    if(res.ok){
      res.json().then(json => {
        alert(JSON.stringify(json));
      });
    }
  })*/
  /*.catch(function(res){ 
    alert(res); 
  })*/
}

class App extends Component{
    render(){
        return (
            buttonsInstance
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))