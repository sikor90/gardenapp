import React from 'react';
export default class ChangeNet extends React.Component {
  buttonClick(){
    this.props.callback();
  }

  render(){
    return <button className="changeNet" onClick={()=>this.buttonClick()}>
      Zrób mniejsze oczka siatki
    </button>
  }
}
