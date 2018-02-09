import React, {Component} from 'react'
import ReactDom from 'react-dom'

class App extends Component{
    render(){
        return (
            <div>
                this is a react component!!
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))