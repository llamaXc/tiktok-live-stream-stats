/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import storeState from '../../../../state/store';
import { Grid, Box, Chip, Paper} from '@mui/material';
import './style.scss';
import FollowEvent from '@renderer/types/FollowEvent';

interface FollowerListProps{
  follower: FollowEvent,
}

const formatFollowCount = (count: number): string => {
    if (count < 100){
        return count + ""
    }else if (count < 1000){
        return `${(count / 100).toFixed(1)}K`
    }else if (count < 1000000){
        return `${(count / 1000).toFixed()}K`
    }
    return count + ""
  }

const FollowerEvent: React.FC<FollowerListProps>= ({follower}) => {


  return (
    <Box style={{paddingTop: "5px", backgroundColor: "white", margin: "10px", borderRadius: "10px", paddingBottom: "5px"}} >
        <p style={{margin: "0px"}}>{follower.username}</p> 
    </Box>
  )
}

const ChatList = () => {
  const followerEvents = storeState((state) => state.followerEvents);
  
  return (
    <Box>
        <h3 style={{margin: "0px", textAlign:"center", color: "white"}}>Latest Followers</h3>

        {followerEvents.length === 0 && 
            <Paper style={{margin: "10px", padding: "3px", marginTop: "10px"}}>
                <p>No new followers yet.</p>
            </Paper>
        }
        {followerEvents.map((follower, index) => (
            <FollowerEvent key={index} follower={follower}/>
        ))}
    </Box>

  );
};

export default ChatList;
