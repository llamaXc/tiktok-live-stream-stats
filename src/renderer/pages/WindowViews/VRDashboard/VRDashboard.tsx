
import React from 'react'
import storeState from '@renderer/state/store'
import { Grid, Box, Paper, Chip} from '@mui/material'
import VRJoinList from './components/VRJoinList'
import Chart from '../../../components/Charts/LineChart'
import VRChatList from './components/VRChatList'
import VRFollowList from './components/VRFollowList'
import VRGiftList from './components/VRGiftList'
export const VRDashboard = () => {

    const comments = storeState((state) => state.comments)
    const viewData = storeState((state) => state.minuteViewData)
    // const highestView = storeState((state) => state.highestViewCount)
    const followData = storeState((state) => state.minuteFollowerData)
    const likeData = storeState((state) => state.minuteLikeData)
    const shareData = storeState((state) => state.minuteShareData)
    const giftData = storeState((state) => state.minuteGiftData)
    const chatData = storeState((state) => state.minuteChatData)


    return (
    <Grid container spacing={1}>

        {/* Left Side */}
        <Grid item lg={4} xs={6}>
            <VRChatList comments={comments.slice(0,20)}/>
        </Grid>

        <Grid container lg={8} xs={6} direction={"column"}>
            <Grid container sx={{height: "50%", overflow: "hidden"}}>
                <Grid item xs={6}>
                    <VRGiftList/> 
                </Grid>
                <Grid item xs={6}>
                    <VRFollowList/> 
                </Grid>

            </Grid>

            <Grid container sx={{height: "40vh", overflow: "hidden", marginTop: '10px'}}>
                <Grid xs={12} style={{height: "100vh%"}} >

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
                        <h5 style={{margin: "0px"}}>Diamonds: { giftData.length > 0 ? Math.floor(giftData[giftData.length - 1].value) : "Loading"}</h5>
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

                </Grid>
            </Grid>
        </Grid>
   

    </Grid>
    
    )
}

