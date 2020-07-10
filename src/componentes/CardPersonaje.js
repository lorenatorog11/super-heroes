import React, { Component } from 'react'
import { Card, Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class CardPersonaje extends Component {
  constructor(){
    super()
    this.state = {
      like: ''
    }
  }

  componentDidMount () {
    const { personaje } = this.props
    if (localStorage.getItem(personaje.name) !== null) {
      const state = JSON.parse(localStorage.getItem(personaje.name))
      this.setState({
        like: state.like
      })

    }
  }

  onClick = (e) => {    
    const { personaje } = this.props
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

  render() {
    const { personaje } = this.props
    return (
      <Col xs={12} sm={6} md={4} lg={4} className='mb-4'>
        <Card >
          <Link to={`/personajeInfo/${personaje.id}/${personaje.name}/`}><Card.Img variant="top" src={personaje.image.url} className='imagePersonaje'/></Link>
          <Card.Body className='p-2 cardbody'>
            <Card.Title className='text-center'><h3>{personaje.name}</h3></Card.Title>
            <Container>
              <Row>
                 <Col className='text-justify'>This superheroe is a {personaje.appearance.gender} of race {personaje.appearance.race}. {personaje.name} weights {personaje.appearance.weight[1]} and {personaje.appearance.gender === 'Male' ? 'his': personaje.appearance.gender === 'Female' ? 'her' : 'its'} heigth is {personaje.appearance.height[1]}</Col>
              </Row>
              <Row>
                <Col className='pr-0 my-2 col-5'>Publisher:</Col>
                <Col className='pl-0 my-2'>{personaje.biography.publisher}</Col>
              </Row>
            </Container>
            <Container>
              <Row className='my-auto'>
                {this.state.like === true ? <Button variant="success" className='mx-auto btn' onClick={this.onClick} value='Like'>Like</Button> : <Button variant="primary" className='mx-auto btn' onClick={this.onClick} value='Like'>Like</Button> }
                {this.state.like === false ? <Button variant="success" className='mx-auto btn' onClick={this.onClick}  value='DonotLike'>Don't Like</Button>  : <Button variant="danger" className='mx-auto btn' onClick={this.onClick}  value='DonotLike'>Don't Like</Button> }
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}
