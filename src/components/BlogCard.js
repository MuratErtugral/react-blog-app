import * as React from 'react';
import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router";


const BlogCard = ({item,index}) => {
  const [likeNumber, setLikeNumber] = useState(0);
  const [likeColor, setLikeColor] = useState();
  const [click, setClick] = useState(true);

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
  
  const navigate = useNavigate();

  const handleClick = () => {
   navigate("/details",{ state : { item }})
  }

  return (
          <Card sx={{ width:400,height:450,display:"block",marginX:"auto",marginBottom:1 }} key={index}>
              
              <CardMedia
                component="img"
                alt="green iguana"
                height="40%"
                image={item.image}
                objectfit='contain'
                onClick={handleClick}
              />
              <CardContent onClick={handleClick} sx={{ color: "black",textAlign:"start",backgroundColor: "#EFEEFE",fontFamily: "Girassol",textTransform:"capitalize", maxWSidth:"100%",
              height:"35%",minHeight:"35%", overflow:"hidden", paddingBottom:0.5 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{textTransform:"uppercase",textAlign:"center"}}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary"  sx={{textAlign:"center"}}>
                  {item.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{paddingTop: ".2rem" ,textAlign:"start"}}>
                    {`${item.content}`.substring(0, 100) + '...'}
                    </Typography>
              </CardContent>
              <CardContent sx={{ color: "black",textAlign:"start", width:"100%" }}>
                <Typography sx={{marginTop:-2}}
                >
                  <IconButton >
                    <AccountCircleIcon fontSize="medium" />
                  </IconButton>
                  {item.author}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{paddingBottom:5}} >
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
          </Card>
  );
}


export default BlogCard