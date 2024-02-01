/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

    const handleError = (_event: any, _data: any) => {
        const {errType, msg}: {errType: string, msg: string} = _event[0]
        if (errType === "failed-to-connect"){
            storeState.getState().setLatestErrorMessage({errType: errType, message: msg, dismissed: false, timestamp: new Date()})
        }
    }

    ipcRenderer.on('like', handleLike);
    ipcRenderer.on('follow', handleFollow);
    ipcRenderer.on('viewerCount', handleViewerCount);
    ipcRenderer.on('chat', handleChat);
    ipcRenderer.on('viewMinuteDataPoint', handleViewMinuteData);
    ipcRenderer.on('followerMinuteDataPoint',handleFollowerMinuteData )
    ipcRenderer.on('likeTotalMinuteDataPoint',handleMinuteLikeData )
    ipcRenderer.on('shareMinuteDataPoint',handleShareMinuteData )
    ipcRenderer.on('giftMinuteData',handleGiftMinuteData )
    ipcRenderer.on('handle-error',handleError )
}

export default setupIPCListeners