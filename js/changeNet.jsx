import React from 'react';
import BiggerButton from './biggerButton.jsx';
import SmallerButton from './smallerButton.jsx';
export default class ChangeNet extends React.Component {

  render(){
    return <div className="changeNet">
      <SmallerButton callback={this.props.callback} />
      <BiggerButton callback={this.props.callback} />
    </div>
  }
}
