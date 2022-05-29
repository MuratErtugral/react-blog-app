import firebase from "../helpers/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import { AuthContext } from "./AuthContext";
import Toastify from "../helpers/toastNotify";

export const BlogContext = createContext();

const d = new Date();
let time = d.toLocaleDateString();

const BlogContextProvider = ({ children }) => {
  const [blogList, setBlogList] = useState();
  const { currentUser } = useContext(AuthContext);

  const AddNewBlog = (blog) => {
    const dataBase = getDatabase();
    const blogRef = ref(dataBase, "blogs");
    const newBlogRef = push(blogRef);
    Toastify("New Blog Added");
    set(newBlogRef, {
      title: blog.title,
      image: blog.image,
      content: blog.content,
      author: currentUser.email,
      date: time,
    });
  };
  const DeleteBlog = (id) => {
    const dataBase = getDatabase();
    remove(ref(dataBase, "blogs/" + id));
    Toastify("Blog Deleted");
  };

  const EditBlog = (item) => {
    const db = getDatabase();
    const updates = {};
    Toastify("Blog Updated");

    updates["blogs/" + item.id] = item;
    return update(ref(db), updates);
  };

  const BlogFetch = () => {
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
      setIsLoading(true);
      const database = getDatabase();
      const blogRef = ref(database, "blogs");

      onValue(blogRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const blogsArray = [];
        for (let id in data) {
          blogsArray.push({ id, ...data[id] });
        }
        
        setBlogList(blogsArray);
        setIsLoading(false);
      });
    }, []);

    return { isLoading, blogList };
  };

  return (
    <BlogContext.Provider
      value={{ AddNewBlog, BlogFetch, DeleteBlog, EditBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
};
export default BlogContextProvider;
