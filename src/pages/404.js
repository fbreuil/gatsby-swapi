import React from 'react'
import error from '../assets/images/error.png';

const NotFoundPage = () => (

  <div className="not-found">
    <div className="error">
      <h1 className="title">404</h1>
      <h2 className="subtitle">Something's missing</h2>
      <p>This page is missing or you assembled the link incorrectly</p>
    </div>
    <div className="image">
      <img src={error} alt="404 Error" />
    </div>
  </div>
)

export default NotFoundPage
