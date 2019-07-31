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
    return (
      <div className="app container">
        <div className="pizza_big">
          <img src={pizzaBig} alt="QUAD ROLLER"/>
        </div>
        <div className="logo">
          <img src={quadRoller} alt="QUAD ROLLER LOGO"/>
        </div>
        <div className="btn_content">
          <Link className="btn" to={routes.SCAN}>ESCÁNEA TU CÓDIGO QR AQUÍ</Link>
        </div>
    </div>
    );
  }
}
