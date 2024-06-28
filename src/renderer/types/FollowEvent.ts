interface FollowEvent{
    username: string,
    uniqueId: string,
    timestamp: Date,
    followInfo: {
        followingCount: number,
        followerCount: number,
        followStatus: number,
        pushStatus: number
    }
}



export default FollowEvent