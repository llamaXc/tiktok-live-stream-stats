import { StreamUserData } from "./ChatComment";

export interface JoinEvent{
    timestamp: number,
    userProfile: StreamUserData
}