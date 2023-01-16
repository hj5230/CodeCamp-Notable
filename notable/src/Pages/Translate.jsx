import React from "react";
import {
  Card,
  Button,
  ButtonGroup,
  ListGroup,
  Nav,
  Badge,
  Form
} from "react-bootstrap";
import { Async } from "../Utils/Async.ts";

/* 
Component Translate
translate page, bind to button "Translate"
*/
class Translate extends React.PureComponent {
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
      lang: false,
      transRow: null
    };
  }
  handleSwitchLang = (e) => {
    this.setState({
      lang: e.target.checked
    })
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
  handleClickTrans = (e) => {
    this.setState({
      transRow: e.target.parentNode.id
    })
    this.handleTranslate()
  }
  handleTranslate = async() => {
    let from, to
    const { lang, transRow, content } = this.state
    if(!transRow) return
    if(lang) {
      from = 'fin'
      to = 'en'
    } else {
      from = 'en'
      to = 'fin'
    }
    let words = content[transRow - 1].getWords()
    let result = await Async.postTranslate("http://localhost:3001/translate", from, to, words)
    content[transRow - 1].setWords(result.trans_result[0].dst)
    this.setState(() => {
      return {
        content: content
      }
    }, () => {
      this.forceUpdate()
    })
  }
  render() {
    return (
      <>
        <div className="panel">
          <Card>
            <Card.Header>
              <Nav>
                <Nav.Item>
                  <ButtonGroup size="sm" id="btn-back">
                    <Button variant="outline-success" onClick={this.handleSaveBack}>
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
                    <Button variant="outline-primary" onClick={this.handleSave}>
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
                {this.state.content.map((item) => (
                  <ListGroup.Item
                    key={item.getLine()}
                    id={item.getLine()}
                    onClick={this.handleClickRow}
                  >
                    <Badge pill bg="light" text="secondary">
                      {item.getLine()}
                    </Badge>{" "}
                    {item.getWords()}
                    <Button variant="warning" size="sm" id={item.getLine()} className="btn-translate" style={{paddingLeft: 5, paddingRight: 5, paddingTop: 0}} onClick={this.handleClickTrans}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-translate"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                        <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                      </svg>
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <Nav>
                <Nav.Item>
                <span>&#x1F1EB;&#x1F1EE;</span>
                </Nav.Item>
                <Nav.Item>
                <Form>
                  <Form.Check
                    type="switch"
                    id="lang"
                    checked={this.state.lang}
                    onChange={this.handleSwitchLang}
                  />
                </Form>
                </Nav.Item>
                <Nav.Item>
                <span>&#x1F1EC;&#x1F1E7;</span>
                </Nav.Item>
              </Nav>
            </Card.Footer>
          </Card>
        </div>
      </>
    );
  }
}

export default Translate;
