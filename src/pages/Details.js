import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BlogContext } from '../contexts/BlogContext';

const Details = () => {
  
  const location = useLocation();
  const item = location.state.item;
  const { currentUser } = useContext(AuthContext);
  const { DeleteBlog }  = useContext(BlogContext);
  const [likeNumber, setLikeNumber] = useState(0);
  const [likeColor, setLikeColor] = useState();
  const [click, setClick] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate("/update", { state: { item } });
  }

  const handleDelete = () => {
    DeleteBlog(item.id)
    navigate("/")
  }

  const handleLike = () => {
    if (click) {
      setLikeNumber(likeNumber + 1);
      setLikeColor("red");
      setClick(!click);
    } else {
      setLikeNumber(likeNumber - 1);
      setLikeColor();
      setClick(!click);
    }
  };
  
  return (
    
    <Card sx={{ width: "80%" , height: "100vh",margin:"4rem auto" }}  >
      <Typography component="h1" variant="h5"sx={{textAlign:"center"}} >
          ──── DETAILS ────
      </Typography>
      <CardMedia
        component="img"
        height="200"
        width="500"
        object-fit= "contain"
        // max-width= "100%" 
        // max-heigth="50%"
        // height = "auto"
        image={item.image}

        alt="Paella dish"
        
        
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "block",
            backgroundColor: "#EFEEFE",
            padding: "0.5rem",
            fontFamily: "Girassol",
          }}
          
        >
          <div
            style={{
              paddingTop: "1rem",
              textAlign: "center",
              color: "#046582",
            }}
          >
            <h3>{item.title}</h3>
            <h6 style={{ color: "grey" }}>{item?.date}</h6>
          </div>
          {item.content}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "black", textAlign: "start", mt: 2 }}
        >
          <IconButton sx={{ color: "black", p: 0 }}>
            <AccountCircleIcon fontSize="small" />
          </IconButton>
          {item.author}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => {
            handleLike();
          }}
          sx={{ color: `${likeColor}` }}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
        </IconButton>
        <span>{likeNumber}</span>
        <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <span>1</span>
        
      </CardActions>
      {(currentUser?.email==item.author) ?  <div style={{ display:"flex", justifyContent:"space-evenly", marginTop:"1rem" }}>
      <Button variant="contained" onClick={handleNavigate}  >Update</Button>
      <Button variant="contained" onClick={handleDelete} color="error" >Delete</Button>
      </div> : <p></p> }
      
    </Card>
  )
}

export default Details