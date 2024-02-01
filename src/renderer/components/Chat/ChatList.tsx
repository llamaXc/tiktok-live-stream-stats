/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import storeState from '../../state/store';
import { Grid, Box, Chip } from '@mui/material';
import './ChatList.scss';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
interface StatsDashboardProps {}

const formatFollowCount = (count: number): string => {
  if (count < 100){
      return count + ""
  }else if (count < 1000){
      return `${(count / 100).toFixed(1)}K`
  }else if (count < 100000){
      return `${(count / 1000).toFixed(1)}K`
  }
  return count + ""
}

const ChatList: React.FC<StatsDashboardProps> = () => {
  const comments = storeState((state) => state.comments);

  const getCellColor = (index: number) => {
    return index % 2 === 0 ? '#c2c0bc' : '#e3e0da'; // Alternating colors
  };
  
  return (
    <Box className="chatContainer">
        {comments.map((comment, index) => (
          <Box key={index} style={{ marginBottom: '2px', backgroundColor: getCellColor(index) }}>
            <Grid container>
              <Grid xs={10}>
                    <p style={{fontSize: "10px", margin: "0px"}}>{comment?.nickname}</p>
                    <p style={{margin: "0px"}}>{comment?.message}</p>        
              </Grid>
              <Grid xs={2}>
                    <Chip label={formatFollowCount(comment?.followInfo.followerCount)}/>
                    <CompareArrowsIcon/>
                    <CompareArrowsIcon/>
              </Grid>
            </Grid>
              
          </Box>
        ))}
    </Box>

  );
};

export default ChatList;
