import React, { Component } from 'react'

export default class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul className='nav'>
            <li><a className='active nav-content' href='#home'>Home</a></li>
            <li><a className='nav-content' href='#news'>News</a></li>
            <li><a className='nav-content' href='#about'>About</a></li>
            <li><a className='nav-content' href='#contact'>Contact</a></li>
            <a className='nav-logo' href='#home'><img className='nav-logo-img' src='assets/images/Logo.png'/></a>
          </ul>
        </nav>
      </div>
    )
  }
}
