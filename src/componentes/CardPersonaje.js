import React, { Component } from 'react'
import { Card, Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class CardPersonaje extends Component {
  render() {
    const { personaje } = this.props
    console.log(personaje)
    return (
      <Col xs={12} sm={6} md={4} lg={4} className='mb-4'>
        <Card >
          <Link to={`/personajeInfo/${personaje.id}/`}><Card.Img variant="top" src={personaje.image.url} className='imagePersonaje'/></Link>
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
                <Button variant="primary" className='mx-auto btn' >Link</Button>
                <Button variant="danger" className='mx-auto btn'>Don't Like</Button>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}
