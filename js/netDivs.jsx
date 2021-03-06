import React from 'react';
export default class NetDivs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      power: 100
    }
  }
  smallSquareNet(){
    this.setState({
      power: this.state.power/2
    })
  }
  bigSquareNet(){
    this.setState({
      power: this.state.power*2
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.smaller == 'smaller'){
      this.smallSquareNet()
    }else if(nextProps.smaller == 'bigger'){
      this.bigSquareNet()
    }
  }
  render(){
    let rowDivArray = [];
    let countRow = this.props.canHeight/this.state.power;
    let columnDivArray = [];
    let countColumn = this.props.canWidth/this.state.power;
    //console.log('count columns' + countColumn);
    //console.log('count rows' + countRow);
    for (let i = 0; i < countRow; i++) {
      for (let j = 0; j < countColumn-1; j++) {
        if(i==0) {
          columnDivArray.push(<div className={`cell_${this.state.power}`} key={Math.ceil(countRow)+j}>{j*this.state.power}</div>);
        }else {
          columnDivArray.push(<div className={`cell_${this.state.power}`} key={Math.ceil(countRow)+j}></div>);
        }

      }
      rowDivArray.push(<div className={`row_${this.state.power}`} key={i}><span>{(i+1)*this.state.power}</span>{columnDivArray}</div>);
      columnDivArray = [];
    }
    //console.log(rowDivArray);
    return <div className='net'>
      {rowDivArray}
    </div>
  }
}
