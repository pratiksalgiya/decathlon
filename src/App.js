import React from 'react';
import ListComponent from './components/ListComponent';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
        this.state={
            apidata:[]
        };
    }
    
  componentWillMount(){
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response)=>{
        console.log(response)
            this.setState({
                apidata:response.data
                });
                }
            )
  }

  render(){
    return (
      <div className="App">
        <ListComponent apidata={this.state.apidata}></ListComponent>
      </div>
    );
  }
  
}

export default App;
