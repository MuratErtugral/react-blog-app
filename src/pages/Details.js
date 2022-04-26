import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { BlogContext } from '../contexts/BlogContext';

const Details = () => {
  const params = useParams();
  const id = (params.blogId)
  console.log(typeof(id))
  const { BlogFetch } = useContext(BlogContext)
  const { row } = BlogFetch();
  // console.log(row["-N0_EmM2ypTz2OQMVzIx"])
  return (
    <div>Details</div>
  )
}

export default Details