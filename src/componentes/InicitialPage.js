import React, { Component } from 'react'
import CardPersonaje from './CardPersonaje'
import { Container, Row, Spinner } from 'react-bootstrap'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

export default class InicialPage extends Component {
  constructor (props){
    super(props)
    this.state = {
      url:'https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/10220603223407783/',
      personajes: [],
      inicio: 1,
      fin: 9
    }
    this.upLoad = this.upLoad.bind(this)
  }

  componentDidMount () {
    const { inicio, fin } = this.state
    this.upLoad( inicio, fin )
  }

  async upLoad( inicio, fin ) {
    const { url } = this.state
    const respuesta = []
    for( let i = inicio; i <= fin; i++ ){
      try {
        this.axiosCancelSource = axios.CancelToken.source()
        const res = await axios.get(`${url}${i}`, { cancelToken: this.axiosCancelSource.token })
        respuesta.push(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    this.setState({ personajes: respuesta });   
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    this.setState({
      personajes: []
    })    
    if(selectedPage>=0 && selectedPage<=80){
      const inicio = (9*selectedPage)+ 1
      const fin = 9*(selectedPage+1)
      this.setState({
        inicio: inicio,
        fin: fin
      })
      this.upLoad(inicio, fin)
    }
    if(selectedPage === 81){
      const inicio = (9*selectedPage)+ 1
      const fin = inicio + 1
      this.setState({
        inicio: inicio,
        fin: fin
      })
      this.upLoad(inicio, fin)
    }
  };

  componentWillUnmount () {
    if (this.axiosCancelSource !== undefined) {
      this.axiosCancelSource.cancel('Componente desmontado.')
    }
  }

  render() {
    const { personajes } = this.state
    return (
      <div className="App">
        <section>
          <div className='col1 pt-4'>Superheroes</div>
          <div  className='col2'></div>
        </section>
        <Container className='pb-2 pt-4'>
          <Row>
            <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={82}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={3}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}/>
          </Row>
        </Container>
        <Container className='p-4'>
          <Row>
            {personajes.length === 0 ? <Spinner animation="grow" className='animation'/> : personajes.map(personaje => {return(<CardPersonaje key={personaje.id} personaje={personaje}></CardPersonaje>)}) }
          </Row>
        </Container>        
      </div>
    );
  }
}