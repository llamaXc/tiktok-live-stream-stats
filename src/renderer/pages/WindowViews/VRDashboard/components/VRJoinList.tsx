/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import storeState from '../../../../state/store';
import { Grid, Box, Chip, Paper} from '@mui/material';
import './style.scss';
// import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {formatLargeValueToShorthand} from '../../../../utils/profileHelper'
import { JoinEvent } from '@renderer/types/JoinEvent';

interface VRJoinProps{
  joinEvent: JoinEvent,
}

const VRJoinItem: React.FC<VRJoinProps>= ({joinEvent}) => {

  const time = joinEvent.timestamp

  const seconds = (Date.now() - time) / 1000
  const shouldFade = (seconds < 2)  
  const fullName = joinEvent.userProfile.accountInfo.followers < 10000

  return (
    <Box style={{paddingTop: "5px", paddingBottom: "5px"}} className={"chatComment " + (shouldFade ?  'fadeIn' : '')}>
      <Grid container>

        {fullName && 
            <Grid xs={12}>
            <p style={{margin: "0px"}}>{joinEvent.userProfile.accountInfo.displayName}</p> 
        </Grid>
        }

        {fullName === false && 
            <>
                <Grid xs={9}>
                    <p style={{margin: "0px"}}>{joinEvent.userProfile.accountInfo.displayName}</p> 
                </Grid>
                <Grid xs={3}>
                    <Chip label={formatLargeValueToShorthand(joinEvent.userProfile.accountInfo.followers)}/>
                </Grid>
            </>
        }

      </Grid>
    </Box>
  )
}

const MemberJoinList = () => {
  const memberJoinEvents = storeState((state) => state.joinEvents);
  
  return (
    <Box >
        <h3 style={{margin: "0px", textAlign:"center", color: "white"}}>Joined</h3>

        {memberJoinEvents.length === 0 && 
            <Paper style={{padding: "10px", marginTop: "10px"}}>
                <p>Waiting for users to join.</p>
            </Paper>
        }
        {memberJoinEvents.map((memberJoin, index) => (
            <VRJoinItem key={index} joinEvent={memberJoin}/>
        ))}
    </Box>

  );
};

export default MemberJoinList;
