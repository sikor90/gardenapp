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
        coordinates: "początkowy array"
      }
    }
    getCoordinates(goodCoordinates) {
      this.setState({
        coordinates: goodCoordinates
      });
    }
    clearButtonClick(){
      this.setState({
        clearCanvas: true
      });
      setTimeout(()=>this.setState({
        clearCanvas: false
      }), 500);
    }
    changeSquareNet(size){
      this.setState({
        changeSquare: size
      });
      setTimeout(()=>this.setState({
        changeSquare: undefined
      }), 500);
    }
    render() {
      //callback={(array)=>this.getCoordinates(array)}
      return <div>
        <CanvasElement clearOrNotCanvas={this.state.clearCanvas} smaller={this.state.changeSquare} callback={(array)=>this.getCoordinates(array)} />
        <ClearButton callback={()=>this.clearButtonClick()}/>
        <Area coordinates={this.state.coordinates} />
        <ChangeNet callback={(size)=>this.changeSquareNet(size)} />
      </div>;
    }
  }
  ReactDOM.render(
      <App />,
      document.getElementById('app')
  );

});
