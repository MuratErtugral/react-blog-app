import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Block from "../assets/blok.png";
import { BlogContext } from "../contexts/BlogContext"


const initialValues={title:"", image:"",content:""};






const theme = createTheme();


export default function NewBlog() {
  
  const { AddNewBlog } = useContext(BlogContext);
  const [blog, setBlog] = useState(initialValues)
  
  const handleChange = (e) => {
    e.preventDefault();
    const { name,value } = e.target
    
    setBlog({...blog, [name]:value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(blog);
    AddNewBlog(blog)
    setBlog(initialValues)
    
  };
  

  return (
    
    <div >
    <ThemeProvider theme={theme}>
      <Container sx={{backgroundColor :"white",}} component="main" maxWidth="xs"  >
        <CssBaseline />
        <Box
          sx={{
            
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
            
          }}
        >
          
            <img src={Block} alt="block" style={{margin:"1rem",padding:"1rem",borderRadius: "50%" , backgroundColor:"gray"}} />
          
          <Typography component="h1" variant="h5">
          ──── NEW BLOG ────
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}  sx={{ mt: 3  }}>
            <Grid container spacing={2}>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={blog.title}
                  onChange={handleChange}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="image"
                  label="Image URL"
                  type="url"
                  id="url"
                  value={blog.image}
                  onChange={handleChange}
                  
                />
              </Grid>
              <Grid item xs={12} l={12}>
              <TextField
                id="outlined-multiline-static"
                name="content"
                required
                label="Content"
                multiline
                // value={}
                fullWidth
                rows={10}
                value={blog.content}
                onChange={handleChange}
               
                />
              </Grid>

              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
 
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
    </div>
  );
}