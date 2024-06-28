/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import storeState from '../../../../state/store';
import { Grid, Box, Chip, Paper} from '@mui/material';
import './style.scss';
import GiftEvent from '@renderer/types/GiftEvent';

interface FollowerListProps{
  gift: GiftEvent,
}


const GiftEventEntry: React.FC<FollowerListProps>= ({gift}) => {
    console.log(JSON.stringify(gift))
    const giftURL = gift.giftPictureUrl
    const nickanme = gift.nickname
    const repeating = gift.repeatEnd === false

    if (repeating && gift.giftType == 1){
        return <></>
    }
    return (
        <Grid container sx={{backgroundColor: "white", borderRadius: "10px", marginBottom: "5px"}}>
            <Grid container direction="column" xs={8}>
                <Grid item>
                    <b>{nickanme}</b>
                </Grid>
                <Grid>
                    <span>{gift.giftName} x {gift.repeatCount}</span> 
                </Grid>
            </Grid>

            <Grid container xs={4} justifyContent="center" alignItems="center">
                <img width="40em" src={giftURL}/>
                <Chip label={gift.diamondCount * gift.repeatCount}/>
            </Grid>

      
        </Grid>
      );
    };


const VRGiftList = () => {
  const giftEvents = storeState((state) => state.giftEvents);
  
  return (
    <Box>
        <h3 style={{margin: "0px", textAlign:"center", color: "white"}}>Gifts</h3>

        {giftEvents.map((gift, index) => (
            <GiftEventEntry key={index} gift={gift}/>
        ))}
    </Box>

  );
};

export default VRGiftList;
