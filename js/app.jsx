import React from 'react';
import ReactDOM from 'react-dom';
import ChangeNet from './changeNet.jsx';
import CanvasElement from './canvasElement.jsx';

document.addEventListener('DOMContentLoaded', function() {



            class ClearButton extends React.Component {
              buttonClick(){
                this.props.callback();
              }
              render() {
                return <button className='buttonComponent' onClick={e=>this.buttonClick(e)}>Wyczyść z innego komponentu</button>;
              }
            }
  class Area extends React.Component {

    render() {

      return <div className='area'>
        <h2>Jakies pole</h2>
        <h2>Jakis obwód {this.props.cosiek}</h2>
      </div>
    }
  }

          class App extends React.Component {
            constructor(props){
              super(props);
              this.state = {
                clearCanvas: false,
                smallSquare: false
              }
            }
            clearButtonClick(){
              this.setState({
                clearCanvas: true
              });
            }
            smallerSquareNet(){
              this.setState({
                smallSquare: true
              });
            }
            render() {
              return <div>
                <CanvasElement clearOrNotCanvas={this.state.clearCanvas} smaller={this.state.smallSquare}/>
                <ClearButton callback={()=>this.clearButtonClick()}/>
                <Area cosiek="siemka"/>
                <ChangeNet callback={()=>this.smallerSquareNet()} />
              </div>;
            }
          }
  ReactDOM.render(
      <App />,
      document.getElementById('app')
  );

});
