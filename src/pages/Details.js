import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { BlogContext } from '../contexts/BlogContext';

const Details = () => {
  const params = useParams();
  const id = (params.blogId)
  console.log(typeof(id))
  const { blogList } = useContext(BlogContext)
  const blog = blogList.filter((item)=>item.id==id)
  console.log(blog)
  
  
  return (
    <div>Details</div>
  )
}

export default Details