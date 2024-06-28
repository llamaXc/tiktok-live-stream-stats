/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FollowEvent from '@renderer/types/FollowEvent'
import GiftDetails from '@renderer/types/GiftEvent'
import { JoinEvent } from '@renderer/types/JoinEvent'
import {create} from 'zustand'
import {ChatComment} from "../types/ChatComment"
import TimestampMetric from "../types/TimestampMetric"

interface ErrorMessage{
    errType: string,
    message: string,
    timestamp: Date,
    dismissed: boolean
}

type Store = {
    likes: number,
    viewers: number, 
    followersGained: number,
    comments: ChatComment[],
    joinEvents: JoinEvent[],
    connectedStreamUsername: string,
    minuteViewData: TimestampMetric[],
    minuteFollowerData: TimestampMetric[],
    minuteMemberJoinedData: TimestampMetric[],
    minuteLikeData: TimestampMetric[],
    highestViewCount: number,
    minuteShareData: TimestampMetric[],
    minuteGiftData: TimestampMetric[],
    latestErrorMessage: ErrorMessage,
    followerEvents: FollowEvent[],
    minuteChatData: TimestampMetric[],
    giftEvents: GiftDetails[],
    streamUrl: string | null,
    followCreator: () => void,
    likeStream: () => void,
    updateTotalLikes: (totalLikes: number) => void,
    updateViewerCount: (viewerCount: number) => void,
    addChatComment: (comment: ChatComment) => void,
    setConnectedUsername: (username: string) => void,
    addMinuteViewData: (viewMetric: TimestampMetric) => void,
    addMinuteFollowerData: (followerMetric: TimestampMetric) => void,
    addMemberJoinedData: (memberMetric: TimestampMetric) => void,
    addMemberJoinedEvent: (memberJoinEvent: JoinEvent) => void,
    addMinuteLikeData: (likeMetric: TimestampMetric) => void,
    addMinuteShareData: (shareMetric: TimestampMetric) => void,
    addMinuteGiftData: (giftMetric: TimestampMetric) => void,
    resetState: () => void,
    setLatestErrorMessage: (error: ErrorMessage) => void,
    dismissErrorMessage: () => void,
    addNewFollowerEvent: (FollowEvent: FollowEvent) => void,
    addMinuteChatData: (chatMetric: TimestampMetric) => void,
    addGiftEvent: (giftEvent: GiftDetails) => void,
    setStreamUrl: (url: string) => void,
    
}

const defaultState: any = {
    likes: 0,
    viewers: 0,
    followersGained: 0,
    comments: [],
    connectedStreamUsername: "",
    minuteViewData: [],
    minuteFollowerData: [],
    minuteMemberJoinedData: [],
    minuteLikeData: [],
    highestViewCount: 0,
    minuteShareData: [],
    minuteGiftData: [],
    followerEvents: [],
    minuteChatData: [],
    giftEvents: [],
    joinEvents: [],
    stringUrl: null
}

const storeState = create<Store>()((set) => ({
    initializedListeners: false,
    likes: 0,
    viewers: 0,
    followersGained: 0,
    comments: [],
    connectedStreamUsername: "",
    minuteViewData: [],
    minuteFollowerData: [],
    minuteMemberJoinedData: [],
    minuteLikeData: [],
    highestViewCount: 0,
    minuteShareData: [],
    minuteGiftData: [],
    minuteChatData: [],
    followerEvents: [],
    giftEvents: [],
    joinEvents: [],
    streamUrl: null,
    latestErrorMessage: {errType: null, message: null, dismissed: true, timestamp: new Date},
    resetState: () => set((state) => {return defaultState}),
    likeStream: () => set((state) => ({likes: state.likes + 1})),
    followCreator: () => set((state) => ({followersGained: state.followersGained + 1})),
    updateTotalLikes: (totalLikes: number) => set(() => ({likes: totalLikes })),
    updateViewerCount: (viewerCount: number) => set((state) => {
        if (viewerCount > state.highestViewCount){
            return {viewers: viewerCount, highestViewCount: viewerCount}
        }
        return {viewers: viewerCount}
    }),
    addChatComment: (comment: ChatComment) => set((state) => {
        const updatedComments = [comment, ...state.comments.slice(0, 50)];
        return { comments: updatedComments };
      }),
    setConnectedUsername: (username: string) => set((state) => ({connectedStreamUsername: username})),
    addMinuteViewData: (viewMetric: TimestampMetric) => set((state) => {
        const udpdatedViewData = [...state.minuteViewData, viewMetric];
        return {minuteViewData: udpdatedViewData}
    }),
    addMinuteFollowerData: (followerMetric: TimestampMetric) => set((state)=>{
        const updatedFollowerData = [...state.minuteFollowerData, followerMetric]
        return {minuteFollowerData: updatedFollowerData}
    }),
    addMemberJoinedData: (memberMetric: TimestampMetric) => set((state)=>{
        let updatedData = [...state.minuteMemberJoinedData, memberMetric];
        if (updatedData.length > 100) {
            updatedData = updatedData.slice(-100);
        }

        return {minuteMemberJoinedData: updatedData}
    }),
    addMinuteLikeData: (likeMetric: TimestampMetric) => set((state) => {
        const updatedData = [...state.minuteLikeData, likeMetric]
    
        return {minuteLikeData: updatedData}
    }),
    addMinuteShareData: (shareMetric: TimestampMetric) => set((state) => {
        const updatedData = [...state.minuteShareData, shareMetric]
        return {minuteShareData: updatedData}
    }),
    addMinuteGiftData: (metric: TimestampMetric) => set((state) => {
        const updatedData = [...state.minuteGiftData, metric]
        return {minuteGiftData: updatedData}
    }),
    addMinuteChatData: (metric: TimestampMetric) => set((state) => {
        const updatedData = [...state.minuteChatData, metric]
        return {minuteChatData: updatedData}
    }),
    setLatestErrorMessage: (error: ErrorMessage) => set((state) => {
        return {latestErrorMessage: error}
    }),
    dismissErrorMessage: () => set((state) => {
        return {latestErrorMessage: {...state.latestErrorMessage, dismissed: true}}
    }),
    addNewFollowerEvent: (followEvent: FollowEvent) => set((state) => {
        return {followerEvents: [followEvent, ...state.followerEvents]}
    }),
    addGiftEvent: (giftEvent: GiftDetails) => set((state) => {
        return {giftEvents: [giftEvent, ...state.giftEvents]}
    }),
    addMemberJoinedEvent: (joinEvent: JoinEvent) => set((state) => {
        const updatedComments = [joinEvent, ...state.joinEvents.slice(0, 50)];
        return {joinEvents: updatedComments}
    }),
    setStreamUrl: (url: string) => set((state) => {
        return {streamUrl: url}
    })

}));

export default storeState