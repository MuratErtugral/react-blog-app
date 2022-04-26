import firebase from "../helpers/firebase";
import { createContext, useContext, useState } from "react";
import { getDatabase,ref,set,push,onValue, remove,update} from "firebase/database";
import { AuthContext } from './AuthContext';

export const BlogContext = createContext();




const BlogContextProvider = ({children}) => {
    
  const { currentUser } = useContext(AuthContext);
  
  const AddNewBlog=(blog)=>{
    
  const dataBase = getDatabase();
  const blogRef=ref(dataBase,"blogs");
  const newBlogRef=push(blogRef)
  set((newBlogRef),{
          title:blog.title,
          image:blog.image,
          content:blog.content,
          author: currentUser.email
      })
  
  }




  return(
    <BlogContext.Provider value={{AddNewBlog}} >
      {children}
    </BlogContext.Provider>
  )
}
export default BlogContextProvider;

