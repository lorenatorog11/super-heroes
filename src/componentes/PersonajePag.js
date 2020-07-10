import React, { Component } from 'react'
import { Col, Container, Row, ProgressBar, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class PersonajePag extends Component {
  constructor (props){
    super(props)
    this.state = {
      url:'https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/10220603223407783/',
      personaje: []
    }
    this.upLoad = this.upLoad.bind(this)
  }

  componentDidMount () {
    this.upLoad()
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
              <Col className='m-4 rounded'><Link to='/'><h5 className='back'>Back</h5></Link></Col>
            </Row>              
          </Container>
        </>
        }
    </div>
    )
  }
}
