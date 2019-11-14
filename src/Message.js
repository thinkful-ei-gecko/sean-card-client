import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core'  

library.add(
  fas
);

const undo = findIconDefinition({ prefix: 'fas', iconName: 'backward' })
const undoIcon = icon(undo);

const redo = findIconDefinition({ prefix: 'fas', iconName: 'forward' })
const redoIcon = icon(redo);


class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      prefixMessage : [
        "To: Sean",
        "From: EI-Cohort-34",
        "We are so sorry to hear that you've been sick. We hope that you find great health soon and continue to kick butt.",
        "Even though your graduation date is going to be different, you're still a part of Cohort 34 and we're all sending you best wishes!",
        "Good luck and get well!",
        "Sincerely:"
      ],
      signature: 0
    }
  }
  displayMessage = () => {
    if (this.state.page === 0 || this.state.page === 1)
    return <h1>{this.state.prefixMessage[this.state.page]}</h1>
    else if (this.state.page === 2 || this.state.page === 3)
    return <p>{this.state.prefixMessage[this.state.page]}</p>
    else if (this.state.page === 4 || this.state.page === 5 && this.state.signature === 0)
    return <h3>{this.state.prefixMessage[this.state.page]}</h3>
    else {
      return <div class="signatureMessage"><h3>{this.props.signatures[this.state.signature-1].name}</h3><p>{this.props.signatures[this.state.signature-1].message ?  `- ${this.props.signatures[this.state.signature-1].message}` : '' }</p></div>
    }

  }
  goBack = () => {
    let currState = this.state.page;
    if (currState !== 0 && this.state.signature === 0) {
      let newPage = currState - 1;
      this.setState({page: newPage});
    }
    if (this.state.signature === 1) {
      this.chooseBackground();
      document.getElementById('footer').style.display = 'none';
    }
    if (currState === this.state.prefixMessage.length-1 && this.state.signature !== 0) {
      let newSig = this.state.signature - 1;
      this.setState({signature: newSig})
    }
  }
  
  goForward = () => {
    let currState = this.state.page;
    if (currState !== this.state.prefixMessage.length-1) {
      let newPage = currState + 1;
      this.setState({page: newPage});
    }
    if (currState === this.state.prefixMessage.length-1 && this.state.signature !== this.props.signatures.length) {
      document.getElementById('footer').style.display = 'block';
      let newSig = this.state.signature + 1
      this.setState({signature: newSig})
    }
    
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
    if (this.state.signature > 0) {
      this.chooseBackground();
    }
    return (
      <div className="message">
        {this.displayMessage()}
        <FontAwesomeIcon onClick={() => this.goBack()} className="undo" icon={undoIcon} size='4x' />
          <FontAwesomeIcon onClick={() => this.goForward()} className="redo" icon={redoIcon} size='4x' />
          <div id="footer" class="footer">Love always, Cohort 34 ❤️</div>
      </div>
    )
  }
}

export default Message;