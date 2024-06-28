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

export class UserDatabase{
    userStoreMap: Map<string, StreamUserData>

    constructor(){
        this.userStoreMap = new Map<string, StreamUserData>()
    }

    fetchUser(uniqueId: string){
        if (this.userStoreMap.has(uniqueId)){
            return this.userStoreMap.get(uniqueId)
        }
        return null
    }

    updateLikeCountForUser(uniqueId: string, likeEvent: any){


        if (this.userStoreMap.has(uniqueId)){
            const userProfile = this.userStoreMap.get(uniqueId)
            this.userStoreMap.set(uniqueId, {...userProfile, likes: userProfile.likes + likeEvent.likeCount, latestInteraction: Date.now() })
        }else{
            const accountInfo = {
                displayName: likeEvent.nickname,
                followers: likeEvent.followInfo.followerCount,
                followsHost: likeEvent.followRole == 1,
                uniqueId: uniqueId,
                topGifterRank: likeEvent.topGifterRank,
                profilePictureUrl: likeEvent.profilePictureUrl
            }

            const initialUserProfile: StreamUserData = {
                likes: likeEvent.likeCount,
                comments: 0,
                shares: 0,
                giftValue: 0,
                accountInfo: accountInfo,
                latestInteraction: Date.now()
            }
            this.userStoreMap.set(uniqueId, {...initialUserProfile})
        }

        return this.userStoreMap.get(uniqueId)
    }

    updateCommentCountForUser(uniqueId: string, commentEvent: any){
        if (this.userStoreMap.has(uniqueId)){
            const userProfile = this.userStoreMap.get(uniqueId)
            this.userStoreMap.set(uniqueId, {...userProfile, comments: userProfile.comments + 1, latestInteraction: Date.now() })
        }else{
            const accountInfo = {
                displayName: commentEvent.nickname,
                followers: commentEvent.followInfo.followerCount,
                followsHost: commentEvent.followRole == 1,
                uniqueId: uniqueId,
                topGifterRank: commentEvent.topGifterRank,
                profilePictureUrl: commentEvent.profilePictureUrl

            }

            const initialUserProfile = {
                likes: 0,
                comments: 0,
                shares: 0,
                giftValue: 0,
                accountInfo: accountInfo,
                latestInteraction: Date.now()
            }
            this.userStoreMap.set(uniqueId, {comments: 1, ...initialUserProfile})
        }
        return this.userStoreMap.get(uniqueId)
    }

    updateGiftValueForUser(uniqueId: string, giftEvent: any){
        if (this.userStoreMap.has(uniqueId)){
            const userProfile = this.userStoreMap.get(uniqueId)
            this.userStoreMap.set(uniqueId, {...userProfile, comments: userProfile.giftValue + giftEvent.diamondCount, latestInteraction: Date.now() })
        }else{
            const accountInfo = {
                displayName: giftEvent.nickname,
                followers: giftEvent.followInfo.followerCount,
                followsHost: giftEvent.followRole == 1,
                uniqueId: uniqueId,
                topGifterRank: giftEvent.topGifterRank,
                profilePictureUrl: giftEvent.profilePictureUrl

            }

            const initialUserProfile = {
                likes: 0,
                comments: 0,
                shares: 0,
                giftValue: 0,
                accountInfo: accountInfo,
                latestInteraction: Date.now()
            }
            this.userStoreMap.set(uniqueId, {giftValue: giftEvent.diamondCount, ...initialUserProfile})   
        }
        return this.userStoreMap.get(uniqueId)

    }

    updateUserJoined(uniqueId: string, joinEvent: any){
        if (this.userStoreMap.has(uniqueId)){
            const userProfile = this.userStoreMap.get(uniqueId)
            this.userStoreMap.set(uniqueId, {...userProfile, latestInteraction: Date.now() })
        }else{
            const accountInfo = {
                displayName: joinEvent.nickname,
                followers: joinEvent.followInfo.followerCount,
                followsHost: joinEvent.followRole == 1,
                uniqueId: uniqueId,
                topGifterRank: joinEvent.topGifterRank,
                profilePictureUrl: joinEvent.profilePictureUrl
            }

            const initialUserProfile = {
                likes: 0,
                comments: 0,
                shares: 0,
                giftValue: 0,
                accountInfo: accountInfo,
                latestInteraction: Date.now()
            }
            this.userStoreMap.set(uniqueId, {...initialUserProfile})
        }
        return this.userStoreMap.get(uniqueId)

    }

    updateShareCountForUser(uniqueId: string, shareEvent: any){
        if (this.userStoreMap.has(uniqueId)){
            const userProfile = this.userStoreMap.get(uniqueId)
            this.userStoreMap.set(uniqueId, {...userProfile, comments: userProfile.shares + 1 })
        }else{
            const accountInfo = {
                displayName: shareEvent.nickname,
                followers: shareEvent.followInfo.followerCount,
                followsHost: shareEvent.followRole == 1,
                uniqueId: uniqueId,
                topGifterRank: shareEvent.topGifterRank,
                profilePictureUrl: shareEvent.profilePictureUrl
            }

            const initialUserProfile = {
                likes: 0,
                comments: 0,
                shares: 0,
                giftValue: 0,
                accountInfo: accountInfo,
                latestInteraction: Date.now()
            }
            this.userStoreMap.set(uniqueId, {shares: 1, ...initialUserProfile})
        }
        return this.userStoreMap.get(uniqueId)

    }
}


