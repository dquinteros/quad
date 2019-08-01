// @flow
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Instascan from 'instascan';
import routes from '../constants/routes';
// Image imports
import pizza  from '../assets/img/pizza.png';
import quadRoller  from '../assets/img/quad-roller-logo.svg';

type Props = {};

export default class Scan extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      goToResult: false
    };
  }

  componentDidMount(){
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    scanner.addListener('scan', (content) => {
      console.log(content)
      if (content == 'https://quad-roller.herokuapp.com') {
        console.log('Ejale')
        scanner.stop();
        this.setState({goToResult: true})
      }
    })
    Instascan.Camera.getCameras()
      .then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      })
      .catch(function (e) {
        console.log('No QR Found');
      });
  }

  render() {

    const currentPage =  <div className="app container">
      <div className="pizza">
          <img src={pizza} alt="QUAD ROLLER"/>
      </div>
      <div className="logo">
          <img src={quadRoller} alt="QUAD ROLLER LOGO"/>
      </div>
      <div id="scanner">
        <video id="preview"></video>
      </div>
      <div className="btn_content">
      <Link className="btn__secondary" to={routes.HOME}>VOLVER</Link>
      <Link className="btn" to={routes.WIN}>ESCANEAR!</Link>
      </div>
    </div>;

    const response = this.state.goToResult ? <Redirect to={routes.WIN}/> : currentPage;
    return response;
  }
}
