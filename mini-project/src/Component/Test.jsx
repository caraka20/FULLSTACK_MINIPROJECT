import React, { useState } from 'react'

const Test = (props) => {

    const [state, setState] = useState()
    //  state => variable yg menerima nilai dari useState
    //  setState => function yg melempar nilai ke useState()
    //  useState => fungsi untuk melempar nilai ke variable state

  return (
    <div>
      <h1>{props.nama}</h1>
    </div>
  )
}

export default Test
