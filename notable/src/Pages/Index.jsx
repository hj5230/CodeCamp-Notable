import React from 'react';
import { Card, Button, Form, InputGroup, Row } from 'react-bootstrap';
// import { icons } from 'bootstrap-icons';
import Note from '../Components/Note';
import { NoteObj } from '../Utils/Skeleton.ts'

/* 
Component Index
index page for the app
*/
class Index extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }
  handleClick = () => {
    if(this.state.title === '') return alert('Cannot add a note without title')
    this.props.newNote(new NoteObj(this.state.title))
  }
  handleForm = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  willRender = () => {
    this.forceUpdate()
  }
  render() {
    return (
      <>
      <div className='panel'>
        <Card>
          {/* <Card.Header>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-journals" viewBox="0 0 16 16">
            <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z"/>
            <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z"/>
          </svg>
          </Card.Header> */}
          <Card.Body>
            <InputGroup>
              <Form.Control value={this.state.title} name='title' onChange={this.handleForm} />
              <Button variant='outline-primary' onClick={this.handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-journal-plus" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                </svg>
              </Button>
            </InputGroup>
          </Card.Body>
          <Card.Body>
            <Row xs={1} md={2} className='g-4'>
              {this.props.notes.map(item => (
                <Note
                delNote={this.props.delNote} update={this.willRender} closer={this.props.closer}
                key={item.getTime()} title={item.getTitle()} createTime={item.getTime()}
                />
              ))}
            </Row>
          </Card.Body>
          {/* <Card.Footer>
            <></>
          </Card.Footer> */}
        </Card>
      </div>
      </>
    )
  }
}

export default Index;
