import React from 'react';
import ReactDOM from 'react-dom';

const canvasWidth = Math.floor(window.innerWidth*0.7);
//console.log('canvasWidth '+ canvasWidth);
const canvasHeight = Math.floor(window.innerHeight*0.8);
//console.log('canvasHeight '+ canvasHeight);
let coordinates = [];
document.addEventListener('DOMContentLoaded', function() {
          class NetDivs extends React.Component {
            constructor(props){
              super(props);
              this.state = {
                power: 100
              }
            }
            smallSquareNet(){
              this.setState({
                power: 10
              })
            }
            componentWillReceiveProps(nextProps) {
              console.log(nextProps);
              if(nextProps.smaller){
                this.smallSquareNet()
              }
            }
            render(){
              let rowDivArray = [];
              let countRow = canvasHeight/this.state.power;
              let columnDivArray = [];
              let countColumn = canvasWidth/this.state.power;
              //console.log('count columns' + countColumn);
              //console.log('count rows' + countRow);
              for (let i = 0; i < countRow; i++) {
                for (let j = 0; j < countColumn-1; j++) {
                  columnDivArray.push(<div className={`cell_${this.state.power}`} key={Math.ceil(countRow)+j}></div>);
                }
                rowDivArray.push(<div className={`row_${this.state.power}`} key={i}>{columnDivArray}</div>);
                columnDivArray = [];
              }
              //console.log(rowDivArray);
              return <div className='net'>
                {rowDivArray}
              </div>
            }
          }
                  class ChangeNet extends React.Component {
                    buttonClick(){
                      this.props.callback();
                    }

                    render(){
                      return <button className="changeNet" onClick={()=>this.buttonClick()}>
                        Zrób mniejsze oczka siatki
                      </button>
                    }
                  }
  class CanvasElement extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        mousePosXStart: undefined,
        mousePosYStart: undefined,
        mousePosXEnd: undefined,
        mousePosYEnd: undefined,
        clear: false,
        mouseClick: 0
      }
    }

    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
      const ctx = this.refs.canvas.getContext('2d');
      if (this.state.clear) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      }else{
        ctx.beginPath();
        ctx.moveTo(this.state.mousePosXStart, this.state.mousePosYStart);
        ctx.lineTo(this.state.mousePosXEnd, this.state.mousePosYEnd);
        ctx.stroke();
      }
    }
    mouseClick(event) {
      if (this.state.mouseClick==0){
        this.setState({
          mousePosXStart: event.nativeEvent.offsetX,
          mousePosYStart: event.nativeEvent.offsetY
        }, () => console.log('Yend: '+ this.state.mousePosYEnd + '. Xend: '+this.state.mousePosXEnd));
      }else if (this.state.mouseClick==1) {
        this.setState({
          mousePosXEnd: event.nativeEvent.offsetX,
          mousePosYEnd: event.nativeEvent.offsetY
        }, () => coordinates.push([this.state.mousePosXStart, this.state.mousePosYStart, this.state.mousePosXEnd, this.state.mousePosYEnd]));
      }else if (this.state.mouseClick==2 || this.state.mouseClick==3){
        this.setState({
          mousePosXStart: this.state.mousePosXEnd,
          mousePosYStart: this.state.mousePosYEnd,
          mousePosXEnd: event.nativeEvent.offsetX,
          mousePosYEnd: event.nativeEvent.offsetY
        }, () => coordinates.push([this.state.mousePosXStart, this.state.mousePosYStart, this.state.mousePosXEnd, this.state.mousePosYEnd]));
      }else if (this.state.mouseClick==4){
        this.setState({
          mousePosXStart: this.state.mousePosXEnd,
          mousePosYStart: this.state.mousePosYEnd,
          mousePosXEnd: coordinates[0][0],
          mousePosYEnd: coordinates[0][1]
        }, ()=>this.giveCoordinates())

      }else {
        alert('ułożyłes czworobok')
      }
      console.log(this.state.mouseClick);
      this.setState({
        mouseClick: this.state.mouseClick + 1
      })
    }
    giveCoordinates(){
      console.log('good' + coordinates);
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.clearOrNotCanvas){
        this.clearCanvasFunction()
      }
    }
    clearCanvasFunction() {
      this.setState({
        mousePosXStart: undefined,
        mousePosYStart: undefined,
        mousePosXEnd: undefined,
        mousePosYEnd: undefined,
        clear: true,
        mouseClick: 0
      }, () => console.log(this.state.clear));
      setTimeout(()=>this.setState({
        clear: false
      }, () => console.log(this.state.clear)), 500)
      coordinates=[];
    }
    render() {
      if (coordinates.length>=3) {
        //poczatek trzeciego wektora X=coordinates[2][0] Y=coordinates[2][1]
        //koniec trzeciego wektora X=coordinates[2][2] Y=coordinates[2][3]
        let firstLength = Math.floor(Math.sqrt(Math.pow((coordinates[0][2]-coordinates[0][0]),2)+Math.pow((coordinates[0][3]-coordinates[0][1]),2)));
        let secondLength = Math.floor(Math.sqrt(Math.pow((coordinates[1][2]-coordinates[1][0]),2)+Math.pow((coordinates[1][3]-coordinates[1][1]),2)));
        let thirdLength = Math.floor(Math.sqrt(Math.pow((coordinates[2][2]-coordinates[2][0]),2)+Math.pow((coordinates[2][3]-coordinates[2][1]),2)));
        let fourthLength = Math.floor(Math.sqrt(Math.pow((coordinates[0][0]-coordinates[2][2]),2)+Math.pow((coordinates[0][3]-coordinates[2][3]),2)));

        console.log(firstLength);
        console.log(secondLength);
        console.log(thirdLength);
        console.log(fourthLength);
        let circuit = firstLength + secondLength + thirdLength + fourthLength;
        console.log("obwód = " + circuit);
        console.log(coordinates);
      }

      return <div className="wrapper">
        <NetDivs smaller={this.state.smallSquare} />
        <canvas ref="canvas" id="canvas_element" width={canvasWidth} height={canvasHeight} onClick={e=>this.mouseClick(e)} >Twoja przeglądarka nie obsługuje elementu Canvas.</canvas>
        {/*<button onClick={e=>this.clearCanvasFunction(e)}>Wyczyść</button>*/}
      </div>;
    }
  }
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
