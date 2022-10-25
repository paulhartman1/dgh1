// @ts-nocheck

import { Calendar } from 'react-calendar'
import { useState } from 'react'

const handleChange = (e) => {
  console.log(e);
  
}
const Event = () => {
  const [value, onChange] = useState(new Date())
  return(<Calendar onChange={handleChange} />);
}

export default Event
