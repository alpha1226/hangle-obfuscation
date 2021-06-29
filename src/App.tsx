import './App.css';
import { Component } from 'react';
import _ from 'lodash'

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
    this.getHangle()
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
    if(typeRandom ===1) typeRandom = 3

    let obfuscationHangul = ''
    if(typeRandom===1){
      // Bottom Obfuscated
      let all_area = ascii % startTextNumber
      let text_area = Math.floor(all_area / 28)
      let common_text_ascii = startTextNumber + (text_area * 28)
      let random = Math.floor((Math.random()*100)%27+1)
      obfuscationHangul = String.fromCharCode(common_text_ascii+random)
    } else if(typeRandom === 2) {
      // 쌍자음 난독화
      obfuscationHangul = String.fromCharCode(ascii + 588)
    } else if(typeRandom === 3){
      console.log('on type3')
      // 모음 난독화
      /*ㅏ0  ㅑ2   
        ㅐ1  ㅒ3   
        ㅓ4  ㅕ6   
        ㅔ5  ㅖ7   
        ㅗ8  ㅛ12  
        ㅜ13 ㅠ17  
        ㅙ10 ㅞ15 ㅚ11 
        ㅡ18 ㅢ19 ㅣ20
        ㅘ9  ㅝ14 ㅟ16  */
        let _index = (ascii - 44032)%588/28
        console.log(_index)
        let _multifly_num = 0
        switch(_index) {
          case 0: _multifly_num = 2; break;
          case 1: _multifly_num = 2; break;
          case 2: _multifly_num = -2; break;
          case 3: _multifly_num = -2; break;
          case 4: _multifly_num = 2; break;
          case 5: _multifly_num = 2; break;
          case 6: _multifly_num = -2; break;
          case 7: _multifly_num = -2; break;
          case 8: _multifly_num = 4; break;
          case 9: _multifly_num = 5; break;
          case 10: _multifly_num = 5; break;
          case 11: _multifly_num = -1; break;
          case 12: _multifly_num = -4; break;
          case 13: _multifly_num = 4; break;
          case 14: _multifly_num = 2; break;
          case 15: _multifly_num = -4; break;
          case 16: _multifly_num = -7; break;
          case 17: _multifly_num = -4; break;
          case 18: _multifly_num = 1; break;
          case 19: _multifly_num = 1; break;
          case 20: _multifly_num = -2; break;
        }
        ascii= ascii+(28*_multifly_num)
        console.log(_multifly_num)
        obfuscationHangul = String.fromCharCode(ascii)
    } else if(typeRandom === 0) {
      obfuscationHangul = hangleChar;
    }
    return obfuscationHangul
  }

  getRandom(ascii: number):number {
    let _random_floor = [true,true,false,true]

    if(_.inRange(ascii, 44032, 44619)) _random_floor[2] = true
    else if (_.inRange(ascii, 45796, 46383)) _random_floor[2] = true
    else if (_.inRange(ascii, 48148, 48735)) _random_floor[2] = true
    else if (_.inRange(ascii, 49324, 49911)) _random_floor[2] = true
    else if (_.inRange(ascii, 51088, 51675)) _random_floor[2] = true

    let _maxRandom = _random_floor.filter(Element => true===Element).length

    let typeRandom = Math.floor((Math.random()*100)%_maxRandom)

    if(!_random_floor[typeRandom]) typeRandom = this.getRandom(ascii)

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
        {/*
          this.getHangle().map(r => {
            return <div>{r}</div>
          })
        */}
      </header>
    </div>
    )
  }
}

export default App;
