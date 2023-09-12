import React, { useState } from 'react'
import Test from '../Component/test'

const Test2 = () => {
    const [halo, setHallo] = useState()
    
  return (
    <div>
      <Test nama="kebon"/>
      {halo ? <h1>haloo gaes</h1> : <h1>Ga hallo</h1>}
    </div>
  )
}

// test2 itu parent
// test itu child nya
export default Test2
