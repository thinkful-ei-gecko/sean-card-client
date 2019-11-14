import React from 'react';
import './App.css';
import './index.css';
import Message from './Message';
import config from './config';
import SignPage from './sign';
import {withRouter} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signatures: [{name: 'leon', message: 'get well soon dude'}, {name: 'nandana'}, {name: 'Scott', message: 'kawabunga dude. Best wishe,s hope everything gets better. miss you'}]
    }
  }

  componentDidMount() {
    return fetch(`localhost:8000:/sign`)
    .then(res => {
      if (!res.ok) {
        throw new Error('error in fetch!')
      }
      return res.json();
    })
    .then(resJson => console.log(resJson))
    .catch(error => {
      console.error('error in fetch');
    });
  }

  chooseBackground = () => {
    let backgroundOptions = ['#662626', '#5f2869', '#2a396b', '#2c6e5c', '#43702e','#736930','#754f31'];
    let currBackground = document.body.style.background;
    let newBackground = currBackground;
    while (currBackground === newBackground) {
      newBackground = backgroundOptions[Math.floor(Math.random() * 7)]
    }
    document.body.style.background = newBackground;
    
  }
  render() {
    this.chooseBackground();
    console.log(this.state.signatures);
    return (
      <div className="App">
        {this.props.location.pathname === '/sign' ? <SignPage /> :<Message signatures={this.state.signatures} />}
      </div>
    );
  }
}

export default withRouter(App);
