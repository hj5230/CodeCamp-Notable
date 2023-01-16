import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NoteObj, RowObj } from "./Utils/Skeleton.ts";
import { Async } from "./Utils/Async.ts";
import RBNavbar from "./Components/RBNavbar";
import Index from "./Pages/Index";
import NoteDetail from "./Pages/NoteDetail";
import Translate from "./Pages/Translate";

/* 
App Component
Main component of the app, parent of all the other components
*/
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      notes: [],
      // closer-props
      identifier: "",
    };
  }
  componentDidMount() {
    this.fetchFromStorage();
  }
  fetchFromStorage = async () => {
    let storage = await Async.fetchStorage("http://localhost:3001");
    let notes = [];
    let words;
    for (let i of storage.notes) {
      words = [];
      for (let j in i[2]) {
        words.push(new RowObj(parseInt(j) + 1, i[2][j]));
      }
      let obj = new NoteObj(i[1]);
      obj.setTime(i[0]);
      obj.setRows(words);
      notes.push(obj);
    }
    this.setState({
      notes: notes,
    });
  };
  saveToStorage = async () => {
    let origin = this.state.notes;
    let json = {
      notes: [],
    };
    let content;
    for (let i of origin) {
      content = [];
      for (let j of i.getContent()) {
        content.push(j.getWords());
      }
      json.notes.push([i.getTime(), i.getTitle(), content]);
    }
    await Async.saveChanges("http://localhost:3001", json);
  };
  newNote = (note) => {
    this.setState(
      () => {
        return {
          notes: [...this.state.notes, note],
        };
      },
      () => {
        this.saveToStorage();
      }
    );
  };
  deleteNote = (createTime) => {
    let index = null;
    let temp = this.state.notes;
    for (let i in this.state.notes) {
      if (this.state.notes[i].getTime() === createTime) index = i;
    }
    temp.splice(index, 1);
    this.setState(
      () => {
        return {
          notes: temp,
        };
      },
      () => {
        this.saveToStorage();
      }
    );
  };
  willFarther = () => {
    this.setState({
      page: 0,
    });
  };
  willCloser = (createTime) => {
    this.setState({
      page: 1,
      identifier: createTime,
    });
  };
  willTranslate = (createTime) => {
    this.setState({
      page: 2,
      identifier: createTime
    });
  };
  willSave = () => {
    this.saveToStorage();
  };
  whichPage = () => {
    if (this.state.page === 0)
      return (
        <Index
          // cb
          newNote={this.newNote}
          delNote={this.deleteNote}
          closer={this.willCloser}
          translate={this.willTranslate}
          // msg
          notes={this.state.notes}
        />
      );
    else if (this.state.page === 1)
      return (
        <NoteDetail
          // cb
          farther={this.willFarther}
          save={this.saveToStorage}
          // msg
          id={this.state.identifier}
          notes={this.state.notes}
        />
      );
    else if (this.state.page === 2)
      return (
        <Translate
          // cb
          farther={this.willFarther}
          save={this.saveToStorage}
          // msg
          id={this.state.identifier}
          notes={this.state.notes}
        />
      );
  };
  render() {
    return (
      <>
        <RBNavbar
          calculator={this.willCalculator}
          translate={this.willTranslate}
          farther={this.willFarther}
        />
        {this.whichPage()}
      </>
    );
  }
}

export default App;
// Rumors are carried by haters, spread by fools and accepted by idiots.
