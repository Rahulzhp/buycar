import React from 'react'
import { Routes, Route } from "react-router-dom"
import Landingpage from './Landingpage'
import Review from './Review'
import SellCar from './SellCar'

const Allroutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Landingpage />}></Route>
            <Route path='/sell' element={<SellCar />}></Route>
            <Route path='/profile' element={<Review />}></Route>
        </Routes>
    )
}

export default Allroutes