export interface ChatComment {
    message: string
    nickname: string,
    uniqueId: string,
    profilePicture: string
    followRole: number,
    followInfo: {
        followingCount: number,
        followerCount: number,
        followStatus: number,
        pushStatus: number
    }
}