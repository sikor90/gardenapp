import React from 'react';
export default class Area extends React.Component {

  render() {

    return <div className='area'>
      <h2>Jakies pole</h2>
      <h2>Jakis obwód {this.props.cosiek}</h2>
    </div>
  }
}
