import React from 'react';
import { Card, Button, Form, InputGroup, Row } from 'react-bootstrap';
import Note from '../Components/Note';
import { NoteObj } from '../TypeScript/Skeleton.ts'

/* 
Component Index
index page for the app
*/
class Index extends React.PureComponent {
  state = {
    title: ''
  }
  handleClick = () => {
    if(this.state.title === '') return alert('Cannot attach note without title')
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
          <Card.Header>
            Attach new note &amp; All notes
          </Card.Header>
          <Card.Body>
            <Form.Label>new note</Form.Label>
            <InputGroup>
              <Form.Control value={this.state.title} name='title' onChange={this.handleForm} />
              <Button variant='outline-primary' onClick={this.handleClick}>Attach</Button>
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
