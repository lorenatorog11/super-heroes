import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import InicialPage from './componentes/InicitialPage'
import PersonajePag from './componentes/PersonajePag'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={InicialPage} />
          <Route exact path='/personajeInfo/:personajeId/:personajeName/' component={PersonajePag}/>
        </Switch>
      </div>
    )
  }
}

export default App