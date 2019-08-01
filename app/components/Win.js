// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import fs from 'fs';
// Image imports
import pizzaBig from './../assets/img/pizza-big.png';
import quadRoller from './../assets/img/quad-roller-logo.svg';
import ganaste from './../assets/img/ganaste.png';
import premio0Proxima from './../assets/img/premio0.png';
import premio1Bolsa from './../assets/img/premio1.png';
import premio2Papertoys from './../assets/img/premio2.png';
import premio3Pizza from './../assets/img/premio3.png';
import premio4Quadpizza from './../assets/img/premio4.png';
import premio5Bateria from './../assets/img/premio5.png';
import premio6ParlanteRojo from './../assets/img/premio6.png';
import premio7ParlanteMadera from './../assets/img/premio7.png';

type Props = {};

const imgs = {
  premio0Proxima: premio0Proxima,
  premio1Bolsa: premio1Bolsa,
  premio2Papertoys: premio2Papertoys,
  premio3Pizza: premio3Pizza,
  premio4Quadpizza: premio4Quadpizza,
  premio5Bateria: premio5Bateria,
  premio6ParlanteRojo: premio6ParlanteRojo,
  premio7ParlanteMadera: premio7ParlanteMadera,
}

export default class Home extends Component<Props> {
  props: Props;
  constructor(){
    super()
    this.state = {
      stockArray: []
    }
  }

  componentDidMount(){
    console.log('here');
    // /Users/dquinteros/code/quad-pizza/temp.txt
    fs.readFile("temp.txt", "utf-8", (err, buf) => {
      const stockArray = buf.toString().split("\n").map(e => e.split(':')).splice(0,8).map(e => [e[0], parseInt(e[1],10)])
      console.log(stockArray);
      this.setState({stockArray})
    });
  }

  render() {
    let roll = 0;
    let selection = null;
    if (this.state.stockArray.length) {
      const totalStock = this.state.stockArray.reduce((acum,value)=> acum + parseInt(value[1],10),0)
      const evaluatedStockArray = this.state.stockArray.map((value, index, array) => {
        const ownValue = (parseInt(value[1],10) / totalStock)*100;
        console.log('splice', array.filter((a,i) => i < index), ownValue)
        const acumValue = ownValue + array.filter((a,i) => i < index).reduce((acum,value)=> acum + (parseInt(value[1],10)/totalStock)*100,0)
        return ({img:value[0], acumValue, index });
      })
      console.log('evaluatedStockArray', evaluatedStockArray)
      const rollArray = []
      for( let i = 0; i <= 100; i+= 1){
        rollArray.push(Math.random()*101)
      }
      const rand = Math.floor(Math.random()*101);
      roll = rollArray.find((value,index) => index === rand )
      console.log('roll', roll)
      selection =  evaluatedStockArray.sort((a,b) => a.acumValue - b.acumValue ).find(e => roll <= e.acumValue)
      console.log('selection',selection )
      let oldStock = [...this.state.stockArray]
      oldStock[selection.index][1] = oldStock[selection.index][1]-1
      const newStock = oldStock.map(e => `${e[0]}:${e[1]}`).join('\n')
      console.log('newStock', newStock)
      fs.writeFile("temp.txt", newStock, (err) => {
      if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
    }


    return (
      <div className="app container">
      {
        !(selection && selection.img === 'premio0Proxima') ?
        <div className="ganaste__content">
              <img src={ganaste} alt="Ganaste" />
        </div>: ''
      }
      <div className="pizza">
          <img src={pizzaBig} alt="QUAD ROLLER"/>
      </div>

      <div id="scanner">
        <div id="preview">
        {
          selection &&
          <div>
          <img src={imgs[selection.img]} alt="price"/>
          </div>
        }
        </div>
      </div>
      <div className="logo">
          <img src={quadRoller} alt="QUAD ROLLER LOGO"/>
      </div>
      <div className="btn_content">
      <Link className="btn" to={routes.HOME}>{selection && selection.img === 'premio0Proxima' ? 'GRACIAS POR PARTICIPAR' : 'FELICIDADES' }</Link>
      </div>
    </div>
    );
  }
}
