/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import storeState from '../../state/store';
import { Grid, Box, Chip, Paper} from '@mui/material';
import './FollowerList.scss';
// import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FollowEvent from '@renderer/types/FollowEvent';
interface StatsDashboardProps {}


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

  const time = follower.timestamp.getTime()

  const seconds = (Date.now() - time) / 1000
  const shouldFade = (seconds < 2)  
  const fullName = follower.followInfo.followerCount < 10000

  return (
    <Box style={{paddingTop: "5px", paddingBottom: "5px"}} className={"chatComment " + (shouldFade ?  'fadeIn' : '')}>
      <Grid container>

        {fullName && 
            <Grid xs={12}>
            <p style={{margin: "0px"}}>{follower.username}</p> 
        </Grid>
        }

        {fullName === false && 
            <>
                <Grid xs={9}>
                    <p style={{margin: "0px"}}>{follower.username}</p> 
                </Grid>
                <Grid xs={3}>
                    <Chip label={formatFollowCount(follower.followInfo.followerCount)}/>
                    
                </Grid>
            </>
        }

      </Grid>
    </Box>
  )
}

const ChatList: React.FC<StatsDashboardProps> = () => {
  const followerEvents = storeState((state) => state.followerEvents);
  
  return (
    <Box className="followContainer">
        <h3 style={{margin: "0px", textAlign:"center", color: "white"}}>Followers</h3>

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
