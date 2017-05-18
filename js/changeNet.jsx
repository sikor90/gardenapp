import React from 'react';
export default class ChangeNet extends React.Component {
  buttonClick(){
    this.props.callback();
  }
  render(){
    return <div className="changeNet">
      <button id="smallerButton" onClick={()=>this.buttonClick()}>
        Zrób mniejsze oczka siatki
      </button>
      <button id="biggerButton" onClick={()=>this.buttonClick()}>
        Zrób większe oczka siatki
      </button>
    </div>
  }
}
