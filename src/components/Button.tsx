import { useState } from "react"

export function Button() {
  const [ number, setNumber ] = useState(0);

  function handlerAdd() {
    setNumber(number + 1);
  }

  return(

    <button onClick={handlerAdd}>Clique aqui {number} </button>
  )
}