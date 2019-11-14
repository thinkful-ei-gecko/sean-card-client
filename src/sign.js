import React from 'react';
import config from './config';

class SignPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      name: '',
      message: ''
    }
  }
  submitForm = (e) => {
    e.preventDefault();
    let submitInfo = {name: this.state.name, message: this.state.message}
    fetch(`${config.API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(submitInfo)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error in post');
      }
    })
    .then(() => this.setState({completed: true}))
    .catch(() => console.error('error in post'));
  }
  render() {
    return(
      <div>
        <form onSubmit={(e) => this.submitForm(e)}>
          <legend>Leave a message for Sean!</legend>
          <label for="name" id="label-name">Your Name:</label>
          <input type="text" onChange={(e) => this.setState({name: e.currentTarget.value})} id="name" name="name" required />
          <label for="message" id="label-message">Optional message:</label>
          <textarea id="message" name="message" onChange={(e) => this.setState({message: e.currentTarget.value})}  />
          <button type="submit">Submit</button>
          {this.state.completed ? <h3>Submitted! Thanks</h3> : ''}
        </form>
      </div>
    )
  }
}

export default SignPage;