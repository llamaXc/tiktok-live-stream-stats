
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react'
import './StatsDashboardView.scss'; // Import the SCSS file for styling
import ChatList from '../.././../components/Chat/ChatList'
import { Box, Grid, Paper, Chip } from '@mui/material';
import Chart from '../../../components/Charts/LineChart'
import storeState from '../../../state/store'
import FollowerList from "../../../components/Followers/FollowerList"
import MemberJoinList from '@components/Members/MemberJoinList';
import SparkleChart from '@components/Charts/SparkleChart'
import ReactPlayer from 'react-player';
import VRGiftList from '../VRDashboard/components/VRGiftList'

const StatsDashboardView = () => {

  const viewData = storeState((state) => state.minuteViewData)
  // const highestView = storeState((state) => state.highestViewCount)
  const followData = storeState((state) => state.minuteFollowerData)
  const likeData = storeState((state) => state.minuteLikeData)
  const shareData = storeState((state) => state.minuteShareData)
  const giftData = storeState((state) => state.minuteGiftData)
  const chatData = storeState((state) => state.minuteChatData)
  const joinData = storeState((state) => state.minuteMemberJoinedData)
  const streamUrl = storeState((state) => state.streamUrl)
  console.log(streamUrl)

  const totalGifts = (giftData.length > 1 ? giftData[giftData.length - 1].value : 0) * .005
  let estimatedEarnings = "NA"
  if (totalGifts > 100){
    estimatedEarnings = (totalGifts).toFixed()
  }else{
    estimatedEarnings = (totalGifts).toFixed(2)
  }

  return (
        <Grid container spacing={1} justifyContent="center" alignItems="stretch">

          <Grid xl={3}  sm={3}>
            
            <ChatList />
          </Grid>

          <Grid xl={6} sm={7} style={{height: "100vh%"}} >
            <Box sx={{display: "flex", flexDirection: "row", width: "100%"}}>
                <Paper 
                  elevation={10}
                  sx={{
                  backgroundColor: 'white',
                  width: '100vw',
                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingRight: "20px",
                  marginRight: "10px",
                  paddingTop: "3px",
                  paddingBottom: "5px",
                }}>
                  <div>
                  <h5 style={{margin: "0px"}}>Views: { viewData.length > 0 ? Math.floor(viewData[viewData.length - 1].value) : "Loading"}</h5>
                  </div>
                  <Chart minuteData={viewData} />
                </Paper>

                <Paper 
                  elevation={10}
                  sx={{
                    height: '150px',
                    backgroundColor: 'white',
                  width: '100vw',
                  paddingTop: "3px",
                  paddingBottom: "5px",
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingRight: "20px",
                  marginLeft: "10px;"
                }}>
                  <div>
                  <h5 style={{margin: "0px"}}>Followers: { followData.length > 0 ? Math.floor(followData[followData.length - 1].value) : "Loading"}</h5>
                  </div>
                  <Chart minuteData={followData} />
                </Paper>
              </Box>

              <Box id="testWrapper" sx={{display: "flex", flexDirection: "row", marginTop: "10px", width: "100%"}}>
                <Paper 
                  elevation={10}
                  sx={{
                  backgroundColor: 'white',
                  width: '100vw',
                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingRight: "20px",
                  marginRight: "10px",
                  paddingTop: "3px",
                  paddingBottom: "5px",
                }}>
                  <div>
                    <h5 style={{margin: "0px"}}>Likes: { likeData.length > 0 ? Math.floor(likeData[likeData.length - 1].value) : "Loading"}</h5>
                  </div>
                  <Chart clampYAxisValues minuteData={likeData} />
                </Paper>

                <Paper 
                  elevation={10}
                  sx={{
                    height: '150px',
                    backgroundColor: 'white',
                  width: '100vw',
                  paddingTop: "3px",
                  paddingBottom: "5px",
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingRight: "20px",
                  marginLeft: "10px;"
                }}>
                  <div>
                  <h5 style={{margin: "0px"}}>Shares: { shareData.length > 0 ? Math.floor(shareData[shareData.length - 1].value) : "Loading"}</h5>
                  </div>
                  <Chart minuteData={shareData} />
                </Paper>
              </Box>

              <Box id="testWrapper" sx={{display: "flex", flexDirection: "row", marginTop: "10px", width: "100%"}}>
                <Paper 
                  elevation={10}
                  sx={{
                  backgroundColor: 'white',
                  width: '100vw',
                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingRight: "20px",
                  marginRight: "10px",
                  paddingTop: "10px",
                  paddingBottom: "5px",
                }}>
                  <div>
                  <h5 style={{margin: "0px"}}>Diamonds: { giftData.length > 0 ? Math.floor(giftData[giftData.length - 1].value) : "Loading"} <Chip label={"$" + estimatedEarnings}></Chip></h5>
                  </div>
                  <Chart minuteData={giftData} />
                </Paper>

                <Paper 
                      elevation={10}
                      sx={{
                        backgroundColor: 'white',
                        width: '100vw',
                        height: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        paddingRight: "20px",
                        marginLeft: "10px",
                        paddingTop: "10px",
                        paddingBottom: "5px",
                }}>
                  <div>
                  <h5 style={{margin: "0px"}}>Comments: { chatData.length > 0 ? Math.floor(chatData[chatData.length - 1].value) : "Loading"}</h5>
                  </div>
                  <Chart minuteData={chatData} />
                </Paper>
              </Box>

              
            <Grid container >
              <Grid width={"50%"}><FollowerList/></Grid>
              <Grid width={"50%"}><MemberJoinList/></Grid>
            </Grid>
        
          </Grid>

          
          <Grid   sm={2} direction={"column"} sx={{paddingLeft: "14px"}}>
          <h3 style={{margin: "0px", textAlign:"center", color: "white"}}>Live Video</h3>
            <ReactPlayer style={{padding: "10px"}} width={"200px"} controls playing url={streamUrl} />
          <VRGiftList/>
          </Grid>
             
          
        </Grid>
    );
}

export default StatsDashboardView