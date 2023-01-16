import React from "react";
import {
  Card,
  Button,
  ListGroup,
  Nav,
  Form,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import { RowObj } from "../Utils/Skeleton.ts";

/* 
Component NoteDetail
render note's detail when open a note
*/
class NoteDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    let obj;
    for (let i of this.props.notes) {
      if (i.getTime() === this.props.id) {
        obj = i;
      }
    }
    this.state = {
      obj: obj,
      content: obj.getContent(),
      modiRow: null,
    };
  }
  handleSave = () => {
    this.props.save();
  };
  handleBack = () => {
    this.props.farther();
  };
  handleSaveBack = () => {
    this.props.save();
    this.props.farther();
  };
  handleClickRow = (e) => {
    this.setState({
      modiRow: e.target.id,
    });
  };
  handleDoneEdit = (e) => {
    let content = this.state.content;
    for (let i in this.state.content) {
      if (content[i].getLine() === parseInt(this.state.modiRow))
        content[i].setWords(e.target.value);
    }
    this.setState({
      content: content,
      modiRow: e.target.id,
    });
  };
  handleNewRow = () => {
    let content = this.state.content;
    let line;
    if (content.length === 0) line = 0;
    else line = parseInt(content[content.length - 1].getLine()) + 1;
    content.push(new RowObj(line, ""));
    this.setState({
      content: content,
      modiRow: line,
    });
  };
  render() {
    return (
      <>
        <div className="panel">
          <Card>
            <Card.Header>
              <Nav>
                <Nav.Item>
                <ButtonGroup size="sm" id="btn-back">
                    <Button variant="outline-primary" onClick={this.handleSaveBack}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-caret-left"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                      </svg>
                    </Button>
                    <Button variant="outline-success" onClick={this.handleSave}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-save2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                      </svg>
                    </Button>
                    <Button variant="outline-danger" onClick={this.handleBack}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </Button>
                  </ButtonGroup>
                </Nav.Item>
                <Nav.Item className="ms-auto" id="closer-title">
                  {this.state.obj.getTitle()}
                </Nav.Item>
                <Nav.Item className="ms-auto" id="closer-time">
                  {"Created:\n"}
                  <br />
                  {this.state.obj.getTime()}
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {this.state.content.map((item) =>
                  item.getLine() === parseInt(this.state.modiRow) ? (
                    <Form.Control
                      key={item.getLine()}
                      id="row-edit"
                      defaultValue={item.getWords()}
                      onBlur={this.handleDoneEdit}
                    />
                  ) : (
                    <ListGroup.Item
                      key={item.getLine()}
                      id={item.getLine()}
                      onClick={this.handleClickRow}
                    >
                      <Badge pill bg="light" text="secondary">
                        {item.getLine()}
                      </Badge>{" "}
                      {item.getWords()}
                    </ListGroup.Item>
                  )
                )}
              </ListGroup>
              <br />
              <Button
                variant="outline-success"
                size="sm"
                bg="success"
                onClick={this.handleNewRow}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-bar-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                  />
                </svg>
              </Button>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default NoteDetail;
