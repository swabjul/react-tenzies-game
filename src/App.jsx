import Die from "./components/Die"
import {useState, useEffect} from "react"
import "./style/App.css"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'



export default function App() {


  const [dice, setDice] = useState(newDice())
  const [tenzies, setTenzies] = useState(false);


  useEffect(() => {
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    const allHeld = dice.every(die => die.isHeld)

    if(allSameValue && allHeld) {
      setTenzies(true)
      console.log("YOUUU WON! BITCH")
    }

  },[dice])




  function newDice() {
    const newDice = []

    for(let i = 0; i < 10; i++) {
      newDice.push(generateRandomDice())
    }

    return newDice

  }

  function generateRandomDice() {
    const randomNumber = Math.ceil(Math.random() * 6)

    return ({
      value: randomNumber,
      isHeld: false,
      id: nanoid()
    })
  }


  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map( die => {
        return die.isHeld ?
        die :
        generateRandomDice()
      }))
    } else {
      setTenzies(false)
      setDice(newDice())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }


  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))




  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice--container">
        {diceElements}
      </div>
      <button 
        className="roll-dice"
        onClick={rollDice}
      >{tenzies ? "New Game" : "Roll"}</button>
    </main>

  )
}