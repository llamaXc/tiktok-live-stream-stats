/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import storeState from '../../state/store';
import { Grid, Box, Chip } from '@mui/material';
import './ChatList.scss';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { ChatComment } from '@renderer/types/ChatComment';
import {formatLargeValueToShorthand} from '../../utils/profileHelper'


interface ChatCommentProps{
  comment: ChatComment,
}

const ChatComment: React.FC<ChatCommentProps>= ({comment}) => {

  const time = comment.timestamp

  const seconds = (Date.now() - time) / 1000
  const shouldFade = (seconds < 2)
  const fullChatComment = comment.userProfile.accountInfo.followers < 10000
  const doesFollowAccount = comment.userProfile.accountInfo.followsHost
  return (
    <Box className={"chatComment " + (shouldFade ?  'fadeIn' : '')}>

      {fullChatComment  && doesFollowAccount === false && 
          <Grid container>
            <Grid xs={12}>
                <p className="chatUsername" style={{margin: "0px"}}>{comment.userProfile.accountInfo.displayName}</p>
                <p style={{margin: "0px"}}>{comment.message}</p> 
            </Grid>
          </Grid>
      }

      {fullChatComment  && doesFollowAccount && 
            <Grid container>
    
              <Grid xs={11}>
              <p className="chatUsername"  style={{margin: "0px"}}>{comment.userProfile.accountInfo.displayName}</p>
              <p style={{margin: "0px"}}>{comment.message}</p> 
          </Grid>
            <Grid xs={1} justifyContent={"flex-end"}>
              <CompareArrowsIcon/> 
          </Grid>
            </Grid>
        }

      {fullChatComment == false && 
        <Grid container>
          <Grid xs={9}>
              <p className="chatUsername" style={{margin: "0px"}}>{comment.userProfile.accountInfo.displayName}</p>
              <p style={{margin: "0px"}}>{comment.message}</p> 
          </Grid>
          <Grid xs={3} justifyContent={"flex-end"}>
              <Box flexDirection={"row"}>
                  {comment.userProfile.accountInfo.followers > 10000 && 
                    <Chip label={formatLargeValueToShorthand(comment.userProfile.accountInfo.followers)}/>
                  }
                  {doesFollowAccount && 
                  <CompareArrowsIcon/> 
                  }
              </Box>
          </Grid>
        </Grid>
      }
    </Box>
  )
}


const ChatList: React.FC = () => {
  const comments = storeState((state) => state.comments);
  
  return (
    <Box className="chatContainer">
      <h3 style={{margin: "0px", textAlign:"center", color: "white"}}>Chat</h3>
        {comments.map((comment, index) => (
            <ChatComment key={index} comment={comment}/>
        ))}
    </Box>
  );
};

export default ChatList;
