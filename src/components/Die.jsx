export default function Dice(props) {
  const style = {
    background: props.isHeld ? "#59E391" : "#fff"
  }
  return (
    <div
      className="die--face"
      id={props.id}
      onClick={props.holdDice}
      style={style}
    >
      <h2>{props.value}</h2>
    </div>
  )
}