import React, { Component } from 'react'
import { filmData } from '../../Shared/ListOfFilms'
import FilmPresentaion from './FilmPre'

export class Main extends Component {
  constructor() {
    super();
    this.state = {
      films: filmData
    };
  }
  render() {
    return <FilmPresentaion films={this.state.films} />
  }       
}
export default Main
