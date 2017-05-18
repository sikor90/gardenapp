import React from 'react';
import NetDivs from './netDivs.jsx';
const canvasWidth = Math.floor(window.innerWidth*0.7);
//console.log('canvasWidth '+ canvasWidth);
const canvasHeight = Math.floor(window.innerHeight*0.8);
//console.log('canvasHeight '+ canvasHeight);
let coordinates = [];
export default class CanvasElement extends React.Component {
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
    }, () => console.log(this.state.clear)), 500);
    coordinates=[];
  }
  clearChangingNetClick(){
    this.props.callback();
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
      <NetDivs smaller={this.props.smaller} canWidth={canvasWidth} canHeight={canvasHeight}/>
      <canvas ref="canvas" id="canvas_element" width={canvasWidth} height={canvasHeight} onClick={e=>this.mouseClick(e)} >Twoja przeglądarka nie obsługuje elementu Canvas.</canvas>
    </div>;
  }
}
