/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect, useState } from 'react';
import { Grid, Box, Chip } from '@mui/material';
import './style.scss';
import { ChatComment } from '@renderer/types/ChatComment';
import {formatLargeValueToShorthand} from '../../../../utils/profileHelper'
import StarIcon from '@mui/icons-material/Star';


interface ChatCommentProps{
  comment: ChatComment,
  index: number,
  startTimestamp: number
}

const COMMENT_AGE_SECONDS = 120

const ChatComment: React.FC<ChatCommentProps>= ({index, startTimestamp, comment}) => {

  const [ageSeconds, setAgeSeconds] = useState((Date.now() - startTimestamp) / 1000)
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAgeSeconds((prevTime) => {
        return prevTime + 0.1;
      });
    }, 200);

    return () => clearInterval(intervalId);
  }, [comment.timestamp, index]);

  const op = (1 - ((Date.now() - comment.timestamp) / 1000) / COMMENT_AGE_SECONDS)
  const showFollowerCount = (comment.userProfile.accountInfo.followers > 10000) 

  const showInteractiveStar = comment.userProfile.comments > 5 || comment.userProfile.likes > 100 || comment.userProfile.giftValue > 5


  return (
        <Grid 
          container 
          spacing={1}
          style={{
            backgroundColor: 'white',
            marginBottom: '20px',
            borderTopRightRadius : '140px',
            borderBottomRightRadius: "140px",
            width: "95%",
            opacity: (op > .1 ? op : 0.1),
          }}
        >
        <Grid xs={2} style={{ display: "flex", alignItems: "center", position: "relative" }}>
            { showInteractiveStar && 
              <StarIcon style={{ fontSize: "34px",  position: "absolute", top: 0, left: 10, color: "gold", zIndex: 1 }} />
            }
            <img
                style={{
                    width: "3em",
                    borderRadius: "50%",
                    marginLeft: "10px",
                }} 
                src={comment.userProfile.accountInfo.profilePictureUrl}
            />
        </Grid>
            <Grid xs={9}>
                <Box>
                    <p className="chatUsername" style={{margin: "0px", fontSize: "1em"}}>{comment.userProfile.accountInfo.displayName}</p>
                    <p style={{margin: "0px"}}>{comment.message}</p> 
                </Box>
            </Grid>
            <Grid xs={3} style={{display: "flex", flexDirection: "column"}}>
                     <Chip label={formatLargeValueToShorthand(comment.userProfile.accountInfo.followers)}/>
                {/* <span style={{fontSize:".5em"}}>Comments: {comment.userProfile.comments}</span>
                <span style={{fontSize:".5em"}}>Likes: {comment.userProfile.likes}</span>
                <span style={{fontSize:".5em"}}>Shares: {comment.userProfile.shares}</span>
                <span style={{fontSize:".5em"}}>Gifts: {comment.userProfile.giftValue}</span>
                <span style={{fontSize:".5em"}}>Follow Status: {comment.userProfile.accountInfo.followsHost}</span> */}
            </Grid>
        </Grid>
  )
}

interface VRChatListProps{
    comments: ChatComment[]
}

const ChatList: React.FC<VRChatListProps> = ({comments}) => {
  
  return (
    <Box className="vrChatList">
      <h3 style={{marginBottom: "10px", marginTop: "0px", textAlign:"center", color: "white"}}>Chat</h3>
        <Box>
          {comments.map((comment, index) => (
              <ChatComment key={index} index={index} startTimestamp={comment.timestamp} comment={comment}/>
          ))}
        </Box>
    </Box>
  );
};

export default ChatList;
