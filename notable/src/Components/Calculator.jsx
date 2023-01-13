/* eslint-disable no-eval */
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { Card } from 'react-bootstrap';

/* 
Component Calculator
Source code for calculator tooltip
bind to button "Calculator"
*/
class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      s: 0, // calculate state
      res: "" //result value
    }
  }
  // input value
  choose = (i) => {
    // e.target.innerHTML  get the value of button
    var v = ''; 
    if (this.state.s !== 0) 
    {
      v = this.state.res + i.target.innerHTML
      
    } else 
    {
      if (this.state.res === '0') 
      { 
        if (i.target.innerHTML === '+' || i.target.innerHTML === '-' || i.target.innerHTML === '*' || i.target.innerHTML === '/' || i.target.innerHTML === '.' ) 
        {
          v = i.target.innerHTML + this.state.res
        } else 
        {
          v = i.target.innerHTML;
        }
      } else if (this.state.res == null) 
      {
        if (i.target.innerHTML !== '+' && i.target.innerHTML !== '*' && i.target.innerHTML !== '/') 
        {
          v = i.target.innerHTML;
        }
      } else 
      {
        var n = this.state.res.split('')
        if (n.length > 0) 
        { 
          var res = n[this.state.res.split('').length - 1]
        }
        if (res === '+' || res === '-' || res === '*' || res === '/' || res === '.') 
        { 
          if (i.target.innerHTML !== '+' && i.target.innerHTML !== '-' && i.target.innerHTML !== '*' && i.target.innerHTML !== '/' ) 
          { 
            v = this.state.res + i.target.innerHTML
          } else 
          { 
            v = this.state.res.substring(0, this.state.res.length - 1) + i.target.innerHTML
          }
        } else 
        {
          v = this.state.res + i.target.innerHTML
        }
      }
    }
    var v_text = ''; 
    if (v !== '' || v !== '.') 
    {
      var lastArrs = v.split('')
        if (lastArrs.length > 0) 
        { 
          var l_texts = lastArrs[v.split('').length - 1]
        }
        if (l_texts === '+' || l_texts === '-' || l_texts === '*' || l_texts === '/') 
        {
          v_text = eval(v.substring(0, v.length - 1))
        } else 
        {
          v_text = eval(v)
        }
    }
    this.setState({
      res: v,
      s: 0,
      value: v_text
    })
  }
  
  delete = () => {
    if (this.state.res) 
    {
      if (typeof this.state.res === 'number') 
      {
        let res = this.state.res.toString()
        this.setState({
          res: res
        })
      }
      this.setState({
        res: this.state.res.substring(0, this.state.res.length - 1),
        s: 0
      })
    }
  }

  AC = () => {
    this.setState({
      res: "",
      s: 0,
      value: ""
    })
  }

  equal = () => {
    if (this.state.res !== '') {
      var e_arr = this.state.res.split('')
      var e_text = e_arr[this.state.res.split('').length - 1]
      if (e_text === '+' || e_text === '-' || e_text === '*' || e_text === '/') {
        let res = this.state.res.substring(0, this.state.res.length - 1)
        this.setState({
          res: res
        })
      }
      this.setState({
        res: eval(this.state.res),
        s: 1,
        value: ""
      })
    }
  }
  
  render() {
    return (
      <Card className='calc-panel'>
        <Card.Header>{'Calculator'}</Card.Header>
        <Card.Body>
          <div>
            <div className=''>
              <div className='cal'>
                <div className='show-num'>
                  <input type="res" value={this.state.res} disabled/>
                  <input type="res" value={this.state.value} disabled />
                </div>
                <div className='btn-cont'>
                  
                  <div className='line1'>
                    <button className='equal' onClick={this.AC}>AC</button>
                    <button onClick={this.delete}>DEL</button>
                    <button onClick={this.choose}>+</button>
                  </div>
                  <div className='line'>
                    <button onClick={this.choose}>7</button>
                    <button onClick={this.choose}>8</button>
                    <button onClick={this.choose}>9</button>
                    <button onClick={this.choose}>-</button>
                    
                  </div>
                  <div className='line'>
                    <button onClick={this.choose}>4</button>
                    <button onClick={this.choose}>5</button>
                    <button onClick={this.choose}>6</button>
                    <button onClick={this.choose}>*</button>
                    
                  </div>
                  <div className="line">
                    <button onClick={this.choose}>1</button>
                    <button onClick={this.choose}>2</button>
                    <button onClick={this.choose}>3</button>
                    <button onClick={this.choose}>/</button>
                  </div>
                  <div className="line2">
                    <button onClick={this.choose}>0</button>
                    <button onClick={this.choose}>.</button>
                    <button className='equal' onClick={this.equal}>=</button>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </Card.Body>
      </Card>
    )
  }
}

export default Calculator;
