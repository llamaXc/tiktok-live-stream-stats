

export interface TikTokAccountInformation {
    displayName: string,
    uniqueId: string,
    followers: number,
    followsHost: boolean,
    topGifterRank: number,
    profilePictureUrl: string,
}

export interface StreamUserData{
    likes: number,
    comments: number,
    shares: number,
    giftValue: number,
    accountInfo: TikTokAccountInformation,
    latestInteraction: number,
}

export interface ChatComment {
    message: string
    timestamp: number,
    userProfile: StreamUserData
}

