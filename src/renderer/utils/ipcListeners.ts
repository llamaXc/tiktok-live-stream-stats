/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FollowEvent from '@renderer/types/FollowEvent';
import GiftDetails from '@renderer/types/GiftEvent';
import { JoinEvent } from '@renderer/types/JoinEvent';
import storeState from '../state/store';
import { ChatComment } from '../types/ChatComment';
import TimestampMetric from '../types/TimestampMetric';

const setupIPCListeners = () => {
    const ipcRenderer = (window as any).ipcRenderer

    const handleLike = (_event: any, data: any) => {
        storeState.getState().updateTotalLikes(_event[0].totalLikes);
    };

    const handleFollow = (_event: any, _data: any) => {
        storeState.getState().followCreator();
        storeState.getState().addNewFollowerEvent(_event[0] as FollowEvent)
    };

    const handleViewerCount = (_event: any, _data: any) => {
        storeState.getState().updateViewerCount(_event[0]);
    };

    const handleChat = (_event: any, _data: any) => {
        storeState.getState().addChatComment(_event[0] as ChatComment);
    };

    const handleViewMinuteData = (_event: any, _data: any) => {
        storeState.getState().addMinuteViewData(_event[0] as TimestampMetric)
    }

    const handleFollowerMinuteData = (_event: any, _data: any) => {
        storeState.getState().addMinuteFollowerData(_event[0] as TimestampMetric)
    }

    const handleMinuteLikeData = (_event: any, _data: any) => {
        storeState.getState().addMinuteLikeData(_event[0] as TimestampMetric)
    }

    const handleShareMinuteData = (_event: any, _data: any) => {
    storeState.getState().addMinuteShareData(_event[0] as TimestampMetric)
    }

    const handleGiftMinuteData = (_event: any, _data: any) => {
        storeState.getState().addMinuteGiftData(_event[0] as TimestampMetric)
    }
    
    const handleChatMinuteData = (_event: any, _data: any) => {
        storeState.getState().addMinuteChatData(_event[0] as TimestampMetric)
    }

    const handleStreamEndedByUser = (_event: any, _data: any) => {
        alert("live ended by user")
    }

    const handleGiftEvent = (_event: any, _data: any) => {
        storeState.getState().addGiftEvent(_event[0] as GiftDetails)
    }

    const handleLatestMemberJoinRate = (_event: any, _data: any) => {
        storeState.getState().addMemberJoinedData(_event[0] as TimestampMetric)
    }

    const handleMemberJoinedEvent = (_event: any, _data: any) => {
        storeState.getState().addMemberJoinedEvent(_event[0] as JoinEvent)
    }

    const handleSetStreamUrl = (_event: any, _data: any) => {
        storeState.getState().setStreamUrl(_event[0])
    }

    const handleError = (_event: any, _data: any) => {
        const {errType, msg}: {errType: string, msg: string} = _event[0]
        if (errType === "failed-to-connect"){
            storeState.getState().setLatestErrorMessage({errType: errType, message: msg, dismissed: false, timestamp: new Date()})
        }
    }

    ipcRenderer.on('like', handleLike);
    ipcRenderer.on('followEvent', handleFollow);
    ipcRenderer.on('viewerCount', handleViewerCount);
    ipcRenderer.on('chat', handleChat);
    ipcRenderer.on('viewMinuteDataPoint', handleViewMinuteData);
    ipcRenderer.on('followerMinuteDataPoint',handleFollowerMinuteData )
    ipcRenderer.on('likeTotalMinuteDataPoint',handleMinuteLikeData )
    ipcRenderer.on('shareMinuteDataPoint',handleShareMinuteData )
    ipcRenderer.on('giftMinuteData',handleGiftMinuteData )
    ipcRenderer.on('handle-error',handleError )
    ipcRenderer.on('chatMinuteData',handleChatMinuteData )
    ipcRenderer.on('stream-ended-by-user',handleStreamEndedByUser )
    ipcRenderer.on('giftEvent', handleGiftEvent)
    ipcRenderer.on('memberJoinedEvent', handleMemberJoinedEvent)
    ipcRenderer.on('memberMinuteDataPoint', handleLatestMemberJoinRate)
    ipcRenderer.on('stream-url', handleSetStreamUrl)
}

export default setupIPCListeners