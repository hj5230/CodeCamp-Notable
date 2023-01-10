import React from 'react';
import { Card, Button, ListGroup, Nav, Form, Dropdown, ButtonGroup, Badge } from 'react-bootstrap';
import { RowObj } from '../TypeScript/Skeleton.ts';

class Closer extends React.PureComponent {
  constructor(props) {
    super(props)
    let obj
    for(let i of this.props.notes) {
      if(i.getTime() === this.props.id) {
        obj = i
      }
    }
    this.state = {
      obj: obj,
      content: obj.getContent(),
      modiRow: null
    }
  }
  handleSave = () => {
    this.props.save()
  }
  handleBack = () => {
    this.props.farther()
  }
  handleSaveBack = () => {
    this.props.save()
    this.props.farther()
  }
  handleClickRow = e => {
    this.setState({
      modiRow: e.target.id
    })
  }
  handleDoneEdit = e => {
    let content = this.state.content
    for(let i in this.state.content) {
      if(content[i].getLine() === parseInt(this.state.modiRow))
      content[i].setWords(e.target.value)
    }
    this.setState({
      content: content,
      modiRow: e.target.id
    })
  }
  handleNewRow = () => {
    let content = this.state.content
    let line
    if(content.length === 0) line = 0
    else line = parseInt(content[content.length - 1].getLine()) + 1
    content.push(new RowObj(line, ''))
    this.setState({
      content: content,
      modiRow: line
    })
  }
  render() {
    return (
      <>
      <div className='panel'>
        <Card>
          <Card.Header>
            <Nav>
              <Nav.Item>
                <Dropdown as={ButtonGroup} id='btn-back' size='sm'>
                  <Button variant='outline-primary' onClick={this.handleSaveBack}>Back</Button>
                  <Dropdown.Toggle split variant='outline-primary' />
                  <Dropdown.Menu id='dropdown-back'>
                    <Dropdown.Item onClick={this.handleSave}>Save</Dropdown.Item>
                    <Dropdown.Item onClick={this.handleBack}>Back without Save</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
              <Nav.Item className='ms-auto' id='closer-title'>
                {this.state.obj.getTitle()}
              </Nav.Item>
              <Nav.Item className='ms-auto' id='closer-time'>
                {'Created:\n'}
                <br/>
                {this.state.obj.getTime()}
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <ListGroup variant='flush'>
              {this.state.content.map(item => (
                (item.getLine() === parseInt(this.state.modiRow)) ? (
                    <Form.Control key={item.getLine()} id='row-edit' defaultValue={item.getWords()} onBlur={this.handleDoneEdit} />
                ) : (
                  <ListGroup.Item key={item.getLine()} id={item.getLine()} onClick={this.handleClickRow}>
                    {/* <div className='d-flex justify-content-between bg-light mb-3'>
                      <div className='p-2'>
                        {item.getLine()}
                      </div>
                      <div className='p-2'>
                        {item.getWords()}
                      </div>
                      <div className='p-2'>
                        {'qwerty'}
                      </div>
                    </div> */}
                    <Badge pill bg='light' text='secondary'>{item.getLine()}</Badge>
                    {' '}
                    {item.getWords()}
                  </ListGroup.Item>
                )
              ))}
            </ListGroup>
            <br />
            <Button variant='outline-success' size='sm' bg='success' onClick={this.handleNewRow}>
                + new row
            </Button>
          </Card.Body>
        </Card>
      </div>
      </>
    )
  }
}

export default Closer;
