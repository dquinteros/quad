// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
// Image imports
import pizzaBig from './../assets/img/pizza-big.png';
import quadRoller from './../assets/img/quad-roller-logo.svg';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const roll = [0,1,2,3,4,5,6,7,8,9].map(value => Math.random()*100).reduce((acum, number) => number>45 ? acum + 1 : acum, 0)
    const winOrLose = roll > 5 ? 'win' : 'lose'
    let winNumber = 0
    if(winOrLose === 'win'){
      winNumber = [0,1,2,3,4,5,6,7,8,9]
      .map(value => Math.random()*100)
      .reduce((acum, value) => acum+value,0)/10
      /*
      4 bambu 0,7
      4 rojo 0,7
      4 power 0,7
      15 pizza 2,9
      15 quad 2,9
      20 paper 3,9
      450 bolsa 87,8
      */
    }
    return (
      <div className="app container">
      <div className="pizza">
          <img src={pizzaBig} alt="QUAD ROLLER"/>
      </div>
      <div className="logo">
          <img src={quadRoller} alt="QUAD ROLLER LOGO"/>
      </div>
      <div>
      <div>
      {roll}
      </div>
        {winOrLose}
        <div>
        {winNumber}
        </div>
      </div>
      <div className="btn_content">
      <Link className="btn" to={routes.HOME}>FELICIDADES</Link>
      </div>
    </div>
    );
  }
}
