
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react'
import './StatsDashboardView.scss'; // Import the SCSS file for styling
import ChatList from '../.././../components/Chat/ChatList'
import { Box, Grid, Paper } from '@mui/material';
import Chart from '../../../components/Charts/LineChart'
import storeState from '../../../state/store'

interface StatsDashboardProps{
}


const StatsDashboardView: React.FC<StatsDashboardProps> = () => {

  const viewData = storeState((state) => state.minuteViewData)
  // const highestView = storeState((state) => state.highestViewCount)
  const followData = storeState((state) => state.minuteFollowerData)
  const likeData = storeState((state) => state.minuteLikeData)
  const shareData = storeState((state) => state.minuteShareData)
  const giftData = storeState((state) => state.minuteGiftData)
    return (
        <Box height="100vh">
        <Grid container spacing={1} justifyContent="center" alignItems="stretch">

          <Grid md={4} sm={4}>
            <ChatList />
          </Grid>

          {/* <Grid md={2} sm={3}>
            <Box sx={{height: "50vh", overflow: "hidden", border: "1px solid black"}}>
              <ChatList />
            </Box>
            <Box sx={{height: "50vh"}}>
              <ChatList />
            </Box>
          </Grid> */}

          <Grid md={8} sm={8}>
            <Box id="testWrapper" sx={{display: "flex", flexDirection: "row", width: "100%"}}>
                <Paper 
                  elevation={10}
                  sx={{
                  height: '200px',
                  backgroundColor: 'white',
                  margin: '0px',
                  width: '100vw',
                  padding: '10px',
                  marginLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingRight: "40px"
                }}>
                  <div>
                  <h5 style={{margin: "0px"}}>Views: { viewData.length > 0 ? Math.floor(viewData[viewData.length - 1].value) : "Loading"}</h5>
                  </div>
                  <Chart minuteData={viewData} />
                </Paper>

                <Paper 
                  elevation={10}
                  sx={{
                  height: '200px',
                  backgroundColor: 'white',
                  margin: '0px',
                  width: '100vw',
                  padding: '10px',
                  marginLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingRight: "40px"
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
                  height: '200px',
                  backgroundColor: 'white',
                  margin: '0px',
                  width: '100vw',
                  padding: '10px',
                  marginLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingRight: "40px"
                }}>
                  <div>
                    <h5 style={{margin: "0px"}}>Likes: { likeData.length > 0 ? Math.floor(likeData[likeData.length - 1].value) : "Loading"}</h5>
                  </div>
                  <Chart minuteData={likeData} />
                </Paper>

                <Paper 
                  elevation={10}
                  sx={{
                  height: '200px',
                  backgroundColor: 'white',
                  margin: '0px',
                  width: '100vw',
                  padding: '10px',
                  marginLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingRight: "40px"
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
                  height: '200px',
                  backgroundColor: 'white',
                  margin: '0px',
                  width: '100vw',
                  padding: '10px',
                  marginLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingRight: "40px"
                }}>
                  <div>
                  <h5 style={{margin: "0px"}}>Diamonds: { giftData.length > 0 ? Math.floor(giftData[giftData.length - 1].value) : "Loading"}</h5>
                  </div>
                  <Chart minuteData={giftData} />
                </Paper>
              </Box>

          </Grid>
        </Grid>
      </Box>
    );
}

export default StatsDashboardView