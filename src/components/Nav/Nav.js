import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul className='nav'>
            <li><Link to={`/`} className='active nav-content'>Home</Link></li>
            <li><a className='nav-content' href='#news'>News</a></li>
            <li><a className='nav-content' href='#about'>About</a></li>
            <li><Link to={`/contact`}><a className='nav-content' href='#contact'>Contact</a></Link></li>
            <Link to={`/`} className='nav-logo'><img className='nav-logo-img' src='../assets/images/Logo.png'/></Link>
          </ul>
        </nav>
      </div>
    )
  }
}
