/* eslint-disable @typescript-eslint/no-unused-vars */
import {appWindow} from './appWindow'
import {WebcastPushConnection} from 'tiktok-live-connector'

function calculateAverage(numbers: number[]) {
    if (numbers.length === 0) {
      return 0;
    }
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / numbers.length;
}

export default class TiktokWrapper {
    uniqueId: string;
    tiktokLiveConnection: WebcastPushConnection;
    latestViewValues: number[]
    latestViewerTotal: number
    latestMemberJoined: number
    latestFollwersGained: number
    latestTotalLikes: number
    latestTotalFollowers: number
    latestTotalShares: number
    latestTotalGiftValue: number
    metricIntervalId: NodeJS.Timeout;
    connected: boolean

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
        }
    }

    constructor(username: string){
        this.uniqueId = username
        this.latestViewValues = []
        this.latestFollwersGained = 0
        this.latestTotalLikes= 0
        this.latestMemberJoined = 0
        this.latestTotalFollowers = 0
        this.latestTotalShares = 0
        this.latestTotalGiftValue = 0
        this.metricIntervalId = setInterval(() => this.emitMetrics(), 5000);
        this.connected = false
    }

    connect(){
        this.tiktokLiveConnection = new WebcastPushConnection(this.uniqueId, {enableWebsocketUpgrade: true});

        this.tiktokLiveConnection.connect().then(state => {
            console.info(`Connected to roomId ${state.roomId}`);
            this.connected = true
            appWindow.webContents.send('change-location', '/dashboard')
        }).catch(err => {
            appWindow.webContents.send('handle-error', {errType: "failed-to-connect", msg: `Failed to join: ${this.uniqueId}. Live not found.`})
        })

        this.tiktokLiveConnection.on('chat', data => {
            const payload = {
                message: data.comment,
                uniqueId: data.uniqueId,
                nickname: data.nickname,
                profilePicture: data.profilePictureUrl,
                followRole: data.followRole,
                followInfo: data.followInfo
            }
            appWindow.webContents.send('chat', payload)
        })

        this.tiktokLiveConnection.on('roomUser', data => {
            this.latestViewerTotal = data.viewerCount
            this.latestViewValues.push(data.viewerCount)
            appWindow.webContents.send('viewerCount', data.viewerCount)
        })
        

        this.tiktokLiveConnection.on('like', _data => {
            const {totalLikeCount, uniqueId} = _data
            this.latestTotalLikes = totalLikeCount
            appWindow.webContents.send('like', {totalLikes: totalLikeCount})
        })

        this.tiktokLiveConnection.on('gift', data => {
            this.latestTotalGiftValue += data.diamondCount
        })

        this.tiktokLiveConnection.on('social', msg => {
            const isFollow = msg.displayType.includes('follow')
            const isShare = msg.displayType.includes('share')

            if (isFollow){
                this.latestFollwersGained += 1
                this.latestTotalFollowers += 1
                appWindow.webContents.send('follow', {username: msg.uniqueId, nickname: msg.nickname, profilePicture: msg.profilePictureUrl})
            }
            
            if (isShare){
                this.latestTotalShares += 1
            }
        })
    
    }

    disconnect(){
        this.tiktokLiveConnection.disconnect();
        this.connected = false
        clearInterval(this.metricIntervalId)
    }

}
