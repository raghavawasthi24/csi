import React from 'react';
import "./Success.css";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import successimg from "../../assets/images/success.svg";
import poster from "../../assets/images/latestposter.jpeg";
// import Poster from "../../assets/images/clip.png";
import csilogo from "../../assets/images/csi-logo.png"

const Success = () => {

  return (
    <div className='success'>
      <div className='success-box'>
        <img src={poster}  alt="poster"/>
        <div>
          <p className='success-txt'>You are successfully registered!</p>
          <p className='success-mail'>The email will be sent soon to your registered mail.</p>
        </div>
      </div>
      {/* <img src={Poster} className='poster' alt="poster"/> */}
          {/* <img src={Poster} className='poster2'  alt="poster"/> */}
          <img src={csilogo} className='csiLogo' alt="logo"/>
    </div>
  )
}

export default Success