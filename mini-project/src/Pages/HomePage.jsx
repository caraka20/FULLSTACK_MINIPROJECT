// import { Card } from 'flowbite-react'
import React from 'react'
import CardTiket from '../Component/CardTiket'
import Jumbotron from '../Component/Jumbotron'
import Filter from '../Component/Filter'

const Home = () => {
  return (
    <div className=' grid '>
      <Jumbotron  />
        <CardTiket />
      
    </div>
  )
}

export default Home
