import React from 'react'
import { useLocation } from 'react-router-dom';

const Update = () => {
  const location = useLocation();
  const item = location.state.item;
  console.log(item)
  return (
    <div>Update</div>
  )
}

export default Update