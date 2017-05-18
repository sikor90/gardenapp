import React from 'react';
export default class ClearButton extends React.Component {
  buttonClick(){
    this.props.callback();
  }
  render() {
    return <button className='buttonComponent' onClick={e=>this.buttonClick(e)}>Wyczyść z innego komponentu</button>;
  }
}
