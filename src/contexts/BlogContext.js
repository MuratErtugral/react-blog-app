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

  const BlogFetch = () => {
    const [isLoading, setIsLoading] = useState();
    const [blogList, setBlogList] = useState();

    useEffect(() => {
        setIsLoading(true)
        const database = getDatabase();
        const blogRef = ref(database, "blogs");

        onValue(blogRef, (snapshot) => {
            const data = snapshot.val();
            const blogsArray = []

            for (let id in data) {
                blogsArray.push({ id, ...data[id] })
            }
            setBlogList(blogsArray)
            setIsLoading(false)
        })
    }, [])
    return { isLoading, blogList }

}




  return(
    <BlogContext.Provider value={{AddNewBlog, BlogFetch}} >
      {children}
    </BlogContext.Provider>
  )
}
export default BlogContextProvider;

