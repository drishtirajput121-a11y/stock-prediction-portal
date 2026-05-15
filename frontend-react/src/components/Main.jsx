import React from 'react'
import Button from './Button'
import Header from './Header'
import Footer from './Footer'

const Main = () => {
  return (
     <>
    <div className='container'>
        <div className='p-5 textg center bg-light-dark rounded align-items-center mt-5'>
            <h1 className='text-light'>Stock Prediction Portal</h1>
            <p className='text-light lead'>Predicting the future of stocks with precision</p>
            <Button text="Register" class = "btn btn-info" />
        </div>
    </div>
    </>
  )
}

export default Main