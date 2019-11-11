import React from 'react'
import styled from 'styled-components'

const InvalidMessage = styled.div`
  color: red;
  margin-top: 5px;
  font-size: 0.8em;
  padding: 3px 5px;
  border: 1px solid red;
  display: inline-block;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 7px;
    height: 7px;
    margin-top: -1px;
    border-color: red;
    border-style: solid;
    border-width: 1px 0 0 1px;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    background-color: white;
    top: 0;
    left: 50%;
  }
`

export const BaseInput = ({ children, error, touched }) => {
  return (
    <div className="form-group">
      {children}
      {error && touched && <InvalidMessage>{error}</InvalidMessage>}
    </div>
  )
}
