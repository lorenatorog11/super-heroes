import React, { Component } from 'react'
import { Col, Container, Row, ProgressBar, Spinner, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default class PersonajePag extends Component {
  constructor (props){
    super(props)
    this.state = {
      url:'https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/10220603223407783/',
      personaje: [],
      like: ''
    }
    this.upLoad = this.upLoad.bind(this)
  }

  componentDidMount () {
    this.upLoad()
    const { match } = this.props;
    if (localStorage.getItem(match.params.personajeName) !== null) {
      const state = JSON.parse(localStorage.getItem(match.params.personajeName))
      this.setState({
        like: state.like
      })
    } 
  }

  async upLoad() {
    const { match } = this.props;
    const { url } = this.state;
    try {
      this.axiosCancelSource = axios.CancelToken.source()
      const res = await axios.get(`${url}${match.params.personajeId}`, { cancelToken: this.axiosCancelSource.token })
      this.setState({ personaje: res.data }); 
    } catch (error) {
      console.log(error)
    }  
  }

  onClick = (e) => {    
    const { personaje } = this.state
    const info = e.target.value
    if (info === 'Like'){
      const { like } = this.state
      if ( like === '' || like === false) {
        this.setState({
          like: true
        })
        const superheroe = {
          id: personaje.id,
          name: personaje.name,
          like: true}
        localStorage.setItem(personaje.name, JSON.stringify(superheroe))
      } else if ( like === true ) {
        this.setState({
          like: ''
        })
        const superheroe = {
          id: personaje.id,
          name: personaje.name,
          like: ''}
        localStorage.setItem(personaje.name, JSON.stringify(superheroe))
      }

    } else if (info === 'DonotLike'){
      const { like } = this.state
      if ( like === '' || like === true) {
        this.setState({
          like: false
        })
        const superheroe = {
          id: personaje.id,
          name: personaje.name,
          like: false}
        localStorage.setItem(personaje.name, JSON.stringify(superheroe))
      } else if ( like === false ) {
        this.setState({
          like: ''
        })
        const superheroe = {
          id: personaje.id,
          name: personaje.name,
          like: ''}
        localStorage.setItem(personaje.name, JSON.stringify(superheroe))
      }
    }
  }

  componentWillUnmount () {
    if (this.axiosCancelSource !== undefined) {
      this.axiosCancelSource.cancel('Componente desmontado.')
    }
  }

  render() {
    const { personaje } = this.state;
    const powerstats = [];
    for (const prop in personaje.powerstats) {
      powerstats.push([prop, personaje.powerstats[prop] ])
    }
    return (
      <div className="App">
        {powerstats.length === 0 ? <Spinner animation="grow" className='animation'/> :
        <> 
          <section>
          <div className='col1 pt-4'>{personaje.name}</div>
            <div  className='col2'></div>
          </section>
          <Container>
            <Row className=''>
              <Col className='m-4 rounded d-flex justify-content-center'><img alt={personaje.name} className='img-fluid rounded' src={personaje.image.url}/></Col>
            </Row>
            <Row className='mx-2 description'>
              <Col className='col-12 mt-3'><h4 className='text-center'>Skills</h4></Col>          
              {powerstats.map(power => {return(<Col className='col-12 mb-2' key={power[0]}> <p className='mb-0'>{power[0]}</p><ProgressBar now={power[1]} label={`${power[1]}%`} /></Col>)})}
              <Col className='col-12 mt-3'><h4 className='text-center'>Other information</h4></Col>
              <Col className='col-12 mt-3 text-center'>Full Name: {personaje.biography["full-name"]}</Col>
              <Col className='col-12 mt-3 text-center'>Place of Birth: {personaje.biography["place-of-birth"]}</Col>
              <Col className='col-12 mt-3 text-center'>Occupation: {personaje.work.occupation}</Col>
              <Col className='col-12 mt-3 text-center'>Height: {personaje.appearance.height[1]}</Col>
              <Col className='col-12 mt-3 text-center'>Weight: {personaje.appearance.weight[1]}</Col>              
              <Col className='col-12 mt-3 text-center'>Publisher: {personaje.biography.publisher}</Col>
              <Col className='col-12 my-4 rounded d-flex justify-content-center'>
              {this.state.like === true ? <Button variant="success" className='mx-auto btn' onClick={this.onClick} value='Like'>Like</Button> : <Button variant="primary" className='mx-auto btn' onClick={this.onClick} value='Like'>Like</Button> }
              {this.state.like === false ? <Button variant="success" className='mx-auto btn' onClick={this.onClick}  value='DonotLike'>Don't Like</Button>  : <Button variant="danger" className='mx-auto btn' onClick={this.onClick}  value='DonotLike'>Don't Like</Button> }
              </Col>
              <Col className='m-4 rounded'><Link to='/'><h5 className='back'> <FontAwesomeIcon icon={faChevronLeft} />Back</h5></Link></Col>
            </Row>       
          </Container>
        </>
        }
    </div>
    )
  }
}
