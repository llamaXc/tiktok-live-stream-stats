/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {appWindow} from '../ElectronMain/appWindow'
import { TikTokConnectionWrapper } from './TikTokWrapper';
import {calculateAverage} from "../utils/math"
import { UserDatabase } from './TIktokUserDatabase';

export default class TiktokWrapper {
    uniqueId: string;
    tiktokLiveConnection: TikTokConnectionWrapper;
    latestViewValues: number[]
    latestChatTotal: number
    latestViewerTotal: number
    latestMemberJoined: number
    latestFollwersGained: number
    latestTotalLikes: number
    latestTotalFollowers: number
    latestTotalShares: number
    latestTotalGiftValue: number
    metricIntervalId: NodeJS.Timeout;
    secondMetricIntervalId: NodeJS.Timeout;
    lastLikeTotal: number

    connected: boolean

    UserDB: UserDatabase

    emitMetrics(){
        if (this.connected ){
            if (this.latestViewValues.length > 0){
                const avg = calculateAverage(this.latestViewValues)
                this.latestViewValues = []
                const payload = {
                    value: avg,
                    timestamp: new Date()
                }
                appWindow.webContents.send('viewMinuteDataPoint', payload)
            }
            
            if (this.latestTotalLikes > 0){
                const likePayload = {
                    value: this.latestTotalLikes,
                    timestamp: new Date()
                }
                appWindow.webContents.send('likeTotalMinuteDataPoint', likePayload)
            }

            const followerPayload = {
                value: this.latestTotalFollowers,
                timestamp: new Date()
            }
            appWindow.webContents.send('followerMinuteDataPoint', followerPayload)
        
            const payloadShare = {
                value: this.latestTotalShares,
                timestamp: new Date()
            }
            appWindow.webContents.send('shareMinuteDataPoint', payloadShare)
        

            const payloadGift = {
                value: this.latestTotalGiftValue,
                timestamp: new Date()
            }
            appWindow.webContents.send('giftMinuteData', payloadGift)

            const payloadChat = {
                value: this.latestChatTotal,
                timestamp: new Date()
            }
            appWindow.webContents.send('chatMinuteData', payloadChat)
        }
    }

    emitSecondMetrics(){
        const payloadMember = {
            value: this.latestMemberJoined,
            timestamp: new Date()
        }
        this.latestMemberJoined = 0
        appWindow.webContents.send('memberMinuteDataPoint', payloadMember)
    }

    constructor(username: string){
        this.uniqueId = username
        this.latestViewValues = []
        this.latestFollwersGained = 0
        this.latestChatTotal = 0
        this.latestTotalLikes= 0
        this.latestMemberJoined = 0
        this.latestTotalFollowers = 0
        this.latestTotalShares = 0
        this.latestTotalGiftValue = 0
        this.lastLikeTotal = 0
        this.metricIntervalId = setInterval(() => this.emitMetrics(), 5000);
        this.secondMetricIntervalId = setInterval(() => this.emitSecondMetrics(), 1000);

        this.connected = false
        this.UserDB = new UserDatabase()
    }

    connect(){
   
        console.log("Attempting to connect to: " + this.uniqueId)
        this.tiktokLiveConnection = new TikTokConnectionWrapper(this.uniqueId, {}, true);

        this.tiktokLiveConnection.on('disconnected', (e) => {
            appWindow.webContents.send('user_not_found', this.uniqueId)
        })

        this.tiktokLiveConnection.on('connected', (e) => {
            this.connected = true
            appWindow.webContents.send('change-location', '/dashboard')
            this.setupIPCListeners()
        })

        this.tiktokLiveConnection.connect(false);
    }

    setupIPCListeners(){
        this.tiktokLiveConnection.connection.on('chat', data => {
            const userStreamData = this.UserDB.updateCommentCountForUser(data.uniqueId, data)
            const payload = {
                message: data.comment,
                userProfile: userStreamData,
                timestamp: Date.now()
            }

            this.latestChatTotal += 1
            appWindow.webContents.send('chat', payload)
        })

        this.tiktokLiveConnection.connection.getRoomInfo().then(roomInfo => {
            console.log(JSON.stringify(roomInfo))
            console.log(roomInfo.stream_url.hls_pull_url)

            console.log(`Stream started timestamp: ${roomInfo.create_time}, Streamer bio: ${roomInfo.owner.bio_description}`);

            appWindow.webContents.send('stream-url', roomInfo.stream_url.hls_pull_url)
        }).catch(err => {
            console.error(err);
        })

        this.tiktokLiveConnection.connection.on('roomUser', data => {
            this.latestViewerTotal = data.viewerCount
            this.latestViewValues.push(data.viewerCount)
            appWindow.webContents.send('viewerCount', data.viewerCount)
        })

        this.tiktokLiveConnection.connection.on('member', data => {
            this.latestMemberJoined += 1
            const userProfile = this.UserDB.updateUserJoined(data.uniqueId, data)
            appWindow.webContents.send('memberJoinedEvent', {userProfile: userProfile, timestamp: Date.now()})
        })

        this.tiktokLiveConnection.connection.on('like', _data => {
            const {totalLikeCount, uniqueId} = _data

            if(this.lastLikeTotal == 0 || this.lastLikeTotal < totalLikeCount){
                this.lastLikeTotal = this.latestTotalLikes
                this.latestTotalLikes = totalLikeCount

                this.UserDB.updateLikeCountForUser(uniqueId, _data)
                appWindow.webContents.send('like', {totalLikes: totalLikeCount})
            }
        })

        this.tiktokLiveConnection.connection.on('gift', data => {
            this.latestTotalGiftValue += data.diamondCount
            console.log("Gift inbound from " + data.nickname + " ===========\n" + JSON.stringify(data))
            this.UserDB.updateGiftValueForUser(data.uniqueId,  data)
            appWindow.webContents.send('giftEvent', data)
        })


        this.tiktokLiveConnection.connection.on('streamEnd', actionId => {
            console.log("STREAM ENDINGE  " + actionId)
            if (actionId === 3) {
                console.log('=========== Stream ended by user ==========');
                appWindow.webContents.send('stream-ended-by-user')
                this.connected = false
            }
        })

        this.tiktokLiveConnection.connection.on('error', data => {
            console.log("New error: " + JSON.stringify(data) + " at  " + (Date.now()))
        })

        this.tiktokLiveConnection.connection.on('social', msg => {
            const isFollow = msg.displayType.includes('follow')
            const isShare = msg.displayType.includes('share')

            if (isFollow){
                this.latestFollwersGained += 1
                this.latestTotalFollowers += 1
                appWindow.webContents.send('followEvent', 
                {    
                    uniqueId: msg.uniqueId,
                    username: msg.nickname,
                    timestamp: new Date(),
                    followInfo: msg.followInfo
                })
        }
        
            if (isShare){
                this.latestTotalShares += 1
            }
        })
    }

    disconnect(){
        console.log("Disconnecting, bye")
        this.tiktokLiveConnection.disconnect();
        this.connected = false
        clearInterval(this.metricIntervalId)
    }

}
