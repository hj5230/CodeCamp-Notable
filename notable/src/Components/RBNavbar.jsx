import React from 'react';
import { Navbar, Container, Nav, Button, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import Calculator from './Calculator';

/* 
Component React-Bootstrap Navbar
*/
class RBNavbar extends React.PureComponent {
  handleIndexPage = () => {
    this.props.farther()
  }
  handleCalculator = () => {
    this.props.calculator()
  }
  handleTranslate = () => {
    this.props.translate()
  }
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand onClick={this.handleIndexPage}>NoteBook</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <ButtonGroup>
                  <OverlayTrigger trigger="click" placement="bottom" overlay={<Calculator />}>
                    <Button variant="outline-primary">Calculator</Button>
                  </OverlayTrigger>
                <Button variant='outline-primary' onClick={this.handleTranslate}>Translate</Button>
              </ButtonGroup>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default RBNavbar;
