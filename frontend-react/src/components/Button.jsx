import React from 'react'
import { Link } from 'react-router-dom'

const Button = (props) => {
  const combinedClass = `${props.class || ''} ${props.className || ''}`.trim();
  return (
    <>
      <Link className={`btn ${combinedClass}`} to={props.to}>
        {props.text}
      </Link>
    </>
  )
}

export default Button