import firebase from "../helpers/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { getDatabase,ref,set,push,onValue, remove,update} from "firebase/database";
import { AuthContext } from './AuthContext';

export const BlogContext = createContext();

const d = new Date();
let time = d.toLocaleDateString();



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
          author: currentUser.email,
          date:time
      })
  
  }

  const BlogFetch = () => {
    const [isLoading, setIsLoading] = useState();
    const [blogList, setBlogList] = useState();
    const [row,setRow] = useState();

    useEffect(() => {
        setIsLoading(true)
        const database = getDatabase();
        const blogRef = ref(database, "blogs");

        onValue(blogRef, (snapshot) => {
            const data = snapshot.val();
            setRow(data)
            const blogsArray = []
            console.log(data["-N0_EmM2ypTz2OQMVzIx"])
            for (let id in data) {
                blogsArray.push({ id, ...data[id] })
            }
            console.log(typeof(row))
            setBlogList(blogsArray)
            setIsLoading(false)
        })
    }, [])
    console.log(row)
    return { isLoading, blogList,row }
    

}



  return(
    <BlogContext.Provider value={{AddNewBlog, BlogFetch}} >
      {children}
    </BlogContext.Provider>
  )
}
export default BlogContextProvider;

