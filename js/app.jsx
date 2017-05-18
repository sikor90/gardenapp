import React from 'react';
import ReactDOM from 'react-dom';
import ChangeNet from './changeNet.jsx';
import CanvasElement from './canvasElement.jsx';
import ClearButton from './clearButton.jsx';
import Area from './area.jsx';

document.addEventListener('DOMContentLoaded', function() {
  class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        clearCanvas: false,
        changeSquare: 'bigger'
      }
    }
    clearButtonClick(){
      this.setState({
        clearCanvas: true
      });
    }
    changeSquareNet(){

      this.setState({
        changeSquare: 'smaller'
      });
    }
    render() {
      return <div>
        <CanvasElement clearOrNotCanvas={this.state.clearCanvas} smaller={this.state.changeSquare}/>
        <ClearButton callback={()=>this.clearButtonClick()}/>
        <Area cosiek="siemka"/>
        <ChangeNet callback={()=>this.changeSquareNet()} />
      </div>;
    }
  }
  ReactDOM.render(
      <App />,
      document.getElementById('app')
  );

});
