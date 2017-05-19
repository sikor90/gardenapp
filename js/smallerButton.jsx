import React from 'react';
export default class SmallerButton extends React.Component {
  buttonClick(){
    this.props.callback("smaller");
  }
  render(){
    return <button id="smallerButton" onClick={()=>this.buttonClick()}>
      Mniejsze oczka siatki
    </button>
  }
}
