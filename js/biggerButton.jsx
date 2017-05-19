import React from 'react';
export default class BiggerButton extends React.Component {
  buttonClick(){
    this.props.callback("bigger");
  }
  render(){
    return <button id="biggerButton" onClick={()=>this.buttonClick()}>
      Większe oczka siatki
    </button>
  }
}
