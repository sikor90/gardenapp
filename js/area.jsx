import React from 'react';
export default class Area extends React.Component {

  countCircuit(){

    let firstLength = Math.floor(Math.sqrt(Math.pow((this.props.coordinates[0][2]-this.props.coordinates[0][0]),2)+Math.pow((this.props.coordinates[0][3]-this.props.coordinates[0][1]),2)));
    let secondLength = Math.floor(Math.sqrt(Math.pow((this.props.coordinates[1][2]-this.props.coordinates[1][0]),2)+Math.pow((this.props.coordinates[1][3]-this.props.coordinates[1][1]),2)));
    let thirdLength = Math.floor(Math.sqrt(Math.pow((this.props.coordinates[2][2]-this.props.coordinates[2][0]),2)+Math.pow((this.props.coordinates[2][3]-this.props.coordinates[2][1]),2)));
    let fourthLength = Math.floor(Math.sqrt(Math.pow((this.props.coordinates[0][0]-this.props.coordinates[2][2]),2)+Math.pow((this.props.coordinates[0][3]-this.props.coordinates[2][3]),2)));
    console.log(firstLength);
    console.log(secondLength);
    console.log(thirdLength);
    console.log(fourthLength);
    let circuit = firstLength + secondLength + thirdLength + fourthLength;
    console.log("obwód = " + circuit);
    if(circuit){
      return circuit;
    }else {
      return ""
    }
  }
  countArea(){
    // poczatek pierwszego wektora X=coordinates[0][0] Y=coordinates[0][1]
    // koniec pierwszego wektora X=coordinates[0][2] Y=coordinates[0][3]
    // poczatek drugiego wektora X=coordinates[1][0] Y=coordinates[1][1]
    // koniec drugiego wektora X=coordinates[1][2] Y=coordinates[1][3]
    // poczatek trzeciego wektora X=coordinates[2][0] Y=coordinates[2][1]
    // koniec trzeciego wektora X=coordinates[2][2] Y=coordinates[2][3]

    let firstLength = Math.floor(Math.sqrt(Math.pow((this.props.coordinates[0][2]-this.props.coordinates[0][0]),2)+Math.pow((this.props.coordinates[0][3]-this.props.coordinates[0][1]),2)));
    let secondLength = Math.floor(Math.sqrt(Math.pow((this.props.coordinates[1][2]-this.props.coordinates[1][0]),2)+Math.pow((this.props.coordinates[1][3]-this.props.coordinates[1][1]),2)));
    let thirdLength = Math.floor(Math.sqrt(Math.pow((this.props.coordinates[2][2]-this.props.coordinates[2][0]),2)+Math.pow((this.props.coordinates[2][3]-this.props.coordinates[2][1]),2)));
    let fourthLength = Math.floor(Math.sqrt(Math.pow((this.props.coordinates[0][0]-this.props.coordinates[2][2]),2)+Math.pow((this.props.coordinates[0][3]-this.props.coordinates[2][3]),2)));

    let d1 = Math.floor(Math.sqrt(Math.pow((this.props.coordinates[1][2]-this.props.coordinates[0][0]),2)+Math.pow((this.props.coordinates[1][3]-this.props.coordinates[0][1]),2)));
    let d2 = Math.floor(Math.sqrt(Math.pow((this.props.coordinates[2][2]-this.props.coordinates[1][0]),2)+Math.pow((this.props.coordinates[2][3]-this.props.coordinates[1][1]),2)));
    let aPierwszejProstej = (this.props.coordinates[0][1]-this.props.coordinates[1][3])/(this.props.coordinates[0][0]-this.props.coordinates[1][2]);
    let bPierwszejProstej = this.props.coordinates[0][1]-(((this.props.coordinates[0][1]-this.props.coordinates[1][3])/(this.props.coordinates[0][0]-this.props.coordinates[1][2]))*this.props.coordinates[0][0]);
    let aDrugiejProstej = (this.props.coordinates[1][1]-this.props.coordinates[2][3])/(this.props.coordinates[1][0]-this.props.coordinates[2][2]);
    let bDrugiejProstej = this.props.coordinates[1][1]-(((this.props.coordinates[1][1]-this.props.coordinates[2][3])/(this.props.coordinates[1][0]-this.props.coordinates[2][2]))*this.props.coordinates[1][0]);

    let area = (Math.sqrt((secondLength+firstLength+d1)*(secondLength+firstLength-d1)*(secondLength-firstLength+d1)*(-secondLength+firstLength+d1))/4)+(Math.sqrt((fourthLength+thirdLength+d1)*(fourthLength+thirdLength-d1)*(fourthLength-thirdLength+d1)*(thirdLength-fourthLength+d1))/4)
    //return [d1, ' ', d2, ' aPierwszejProstej: ', aPierwszejProstej, ' bPierwszejProstej: ', bPierwszejProstej, ' aDrugiejProstej: ', aDrugiejProstej, ' bDrugiejProstej: ', bDrugiejProstej];
    if(area){
      return area.toFixed(2);
    }else {
      return ""
    }
  }
  render() {

    return <div className='area'>
      <h2>Pole: {this.countArea()}</h2>
      <h2>Obwód: {this.countCircuit()}</h2>
    </div>
  }
}
