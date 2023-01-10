import React from 'react';
import { Card, Button } from 'react-bootstrap';

class Note extends React.PureComponent {
  handleDel = () => {
    this.props.delNote(this.props.createTime)
    this.props.update()
  }
  handleCsr = () => {
    this.props.closer(this.props.createTime)
  }
  render() {
    return (
      <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>
            { this.props.title }
          </Card.Title>
          <Card.Text>
            { this.props.createTime }
          </Card.Text>
          <Button variant="primary" size='sm' onClick={this.handleCsr}>Closer</Button>
          {' '}
          <Button variant="danger" size='sm' onClick={this.handleDel}>Delete</Button>
        </Card.Body>
      </Card>
      </>
    )
  }
}

export default Note;
