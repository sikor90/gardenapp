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
    let countRow = this.props.canHeight/this.state.power;
    let columnDivArray = [];
    let countColumn = this.props.canWidth/this.state.power;
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
