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
    this.props.callback(coordinates);
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

  render() {
    return <div className="wrapper">
      <NetDivs smaller={this.props.smaller} canWidth={canvasWidth} canHeight={canvasHeight}/>
      <canvas ref="canvas" id="canvas_element" width={canvasWidth} height={canvasHeight} onClick={e=>this.mouseClick(e)} >Twoja przeglądarka nie obsługuje elementu Canvas.</canvas>
    </div>;
  }
}
