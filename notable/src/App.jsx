import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NoteObj, RowObj } from './TypeScript/Skeleton.ts';
import { Async } from './TypeScript/Async.ts'
import RBNavbar from './Components/RBNavbar';
import Index from './Pages/Index';
import Closer from './Pages/Closer';
import Translate from './Pages/Translate'
// import storage from './Storage/main.json'

class App extends React.PureComponent {
  state = {
    page: 0,
    notes: [],
    // closer-props
    identifier: '',
  }
  componentDidMount() {
    this.whyItHaveToReturnBeforeAwaitHowStupidIsThat()
  }
  whyItHaveToReturnBeforeAwaitHowStupidIsThat = async() => {
    let storage = await Async.fetchStorage('http://localhost:3001')
    let notes = []
    let words
    for(let i of storage.notes) {
      words = []
      for(let j in i[2]) {
        words.push(new RowObj(parseInt(j) + 1, i[2][j]))
      }
      let obj = new NoteObj(i[1])
      obj.setTime(i[0])
      obj.setRows(words)
      notes.push(obj)
    }
    this.setState({
      notes: notes
    })
  }
  corsPolicyIsAlsoSillyWhyNotAllowAllByDefault = async() => {
    let origin = this.state.notes
    let json = {
      notes: []
    }
    let content
    for(let i of origin) {
      content = []
      for(let j of i.getContent()) {
        content.push(j.getWords())
      }
      json.notes.push([i.getTime(), i.getTitle(), content])
    }
    await Async.saveChanges('http://localhost:3001', json)
  }
  newNote = (note) => {
    this.setState((state, props) => {
      return {
        notes: [...this.state.notes, note]
      }
    }, () => {
      this.corsPolicyIsAlsoSillyWhyNotAllowAllByDefault()
    })
  }
  deleteNote = (createTime) => {
    let index = null
    let temp = this.state.notes
    for(let i in this.state.notes) {
      if(this.state.notes[i].getTime() === createTime)
      index = i
    }
    temp.splice(index, 1)
    this.setState((state, props) => {
      return {
        notes: temp
      }
    }, () => {
      this.corsPolicyIsAlsoSillyWhyNotAllowAllByDefault()
    })
  }
  willFarther = () => {
    this.setState({
      page: 0
    })
  }
  willCloser = (createTime) => {
    this.setState({
      page: 1,
      identifier: createTime
    })
  }
  willTranslate = () => {
    this.setState({
      page: 2
    })
  }
  willSave = () => {
    this.corsPolicyIsAlsoSillyWhyNotAllowAllByDefault()
  }
  whichPage = () => {
    if(this.state.page === 0) return (
      <Index
      // cb
      newNote={this.newNote} delNote={this.deleteNote} closer={this.willCloser}
      // msg
      notes={this.state.notes} 
      />
    ) 
    else if(this.state.page === 1) return (
      <Closer
      // cb
      farther={this.willFarther} save={this.corsPolicyIsAlsoSillyWhyNotAllowAllByDefault}
      // msg
      id={this.state.identifier} notes={this.state.notes}
      />
    )
    else if(this.state.page === 2) return (
      <Translate
      // cb
      farther={this.willFarther}
      // msg
      />
    )
  }
  render() {
    return (
      <>
        <RBNavbar
        calculator={this.willCalculator} translate={this.willTranslate} farther={this.willFarther}
        />
        {this.whichPage()}
      </>
    )
  }

}

export default App;
// Rumors are carried by haters, spread by fools and accepted by idiots.
