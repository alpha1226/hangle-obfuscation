import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

const startTextNumber = 44032
const endTextNumber = 55203

class App extends Component<any,any> {
  constructor(props: any) {
    super(props)
    this.state = {
      hangle: '',
      obfuscation: ''
    }
    this.hangleHadler = this.hangleHadler.bind(this)
    this.obfuscationHandler = this.obfuscationHandler.bind(this)
    this.setObfuscation = this.setObfuscation.bind(this)
  }

  hangleHadler(e: any){
    this.setState({hangle: e.target.value})
  }

  obfuscationHandler(e: any){
    this.setState({obfuscation: e.target.value})
  }

  getObfuscatedHangul(hangleChar: string){
    let ascii = hangleChar.charAt(0).charCodeAt(0)
    if(ascii===32) return ' '
    //if(12593 <= ascii && ascii <= 12622) return hangleChar
    //if(47 <= ascii && ascii <= 58) return hangleChar
    if(ascii < startTextNumber || ascii > endTextNumber) return hangleChar
    
    let typeRandom = this.getRandom(ascii)

    let obfuscationHangul = ''
    if(typeRandom===1){
      // Bottom Obfuscated
      let all_area = ascii % startTextNumber
      let text_area = Math.floor(all_area / 28)
      let common_text_ascii = startTextNumber + (text_area * 28)
      let random = Math.floor((Math.random()*100)%27+1)
  
      obfuscationHangul = String.fromCharCode(common_text_ascii+random)
    } else if(typeRandom === 2) {
      let _added_num = 588
     
      obfuscationHangul = String.fromCharCode(ascii + _added_num)
    } else if(typeRandom === 0) {
      obfuscationHangul = hangleChar;
    }
    return obfuscationHangul
  }

  getRandom(ascii: number):number {
    let _random_floor = 2    

    if(44032 <= ascii && ascii <= 44619) _random_floor = 3 // 가
    else if (45796 <= ascii && ascii <= 46383) _random_floor = 3 // 다
    else if (48148 <= ascii && ascii <= 48735) _random_floor = 3 // 바
    else if (49324 <= ascii && ascii <= 49911) _random_floor = 3 //사
    else if (51088 <= ascii && ascii <= 51675) _random_floor = 3 //자

    let typeRandom = Math.floor((Math.random()*100)%_random_floor)

    return typeRandom
  }


  getHangle = () => {
    let hangle = ['']
    for(let i=startTextNumber; i<=endTextNumber; i=i+28){
      hangle.push(i.toLocaleString())
      for(let o=i; o<i+28; o++){
        hangle.push(String.fromCharCode(o))
      }
      hangle.push((i+27).toLocaleString())
      hangle.push('\n')
    }
    return hangle
  }


  setObfuscation() {
    let obfuscationHangul = ''
    for(let i=0;i<this.state.hangle.length;i++){
      obfuscationHangul = obfuscationHangul + (this.getObfuscatedHangul(this.state.hangle[i]))
    }
    this.setState({obfuscation: obfuscationHangul})
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <textarea value={this.state.hangle} onChange={this.hangleHadler}>

        </textarea>
        <button onClick={() => this.setObfuscation()}>
          변환
        </button>
        <textarea value={this.state.obfuscation} onChange={this.obfuscationHandler}>

        </textarea>
      </header>
    </div>
    )
  }
}

export default App;
