interface GiftDetails {
    // Gift Details
    giftId: number;
    repeatCount: number;
    repeatEnd: boolean;
    groupId: string;
    monitorExtra: {
      anchor_id: number;
      from_idc: string;
      from_user_id: number;
      gift_id: number;
      gift_type: number;
      log_id: string;
      msg_id: number;
      repeat_count: number;
      repeat_end: number;
      room_id: number;
      send_gift_profit_core_start_ms: number;
      send_gift_send_message_success_ms: number;
      to_user_id: number;
    };
    // Sender Details
    userId: string;
    secUid: string;
    uniqueId: string;
    nickname: string;
    profilePictureUrl: string;
    followRole: 0 | 1 | 2; // 0 = none; 1 = follower; 2 = friends
    userBadges: any[]; // Type as per your actual data
    userDetails: {
      createTime: string;
      bioDescription: string;
      profilePictureUrls: string[];
    };
    followInfo: {
      followingCount: number;
      followerCount: number;
      followStatus: number;
      pushStatus: number;
    };
    isModerator: boolean;
    isNewGifter: boolean;
    isSubscriber: boolean;
    topGifterRank: null;
    msgId: string;
    createTime: string;
    displayType: string;
    label: string;
    gift: {
      gift_id: number;
      repeat_count: number;
      repeat_end: number;
      gift_type: number;
    };
    describe: string;
    giftType: number;
    diamondCount: number;
    giftName: string;
    giftPictureUrl: string;
    timestamp: number;
    extendedGiftInfo?: {
      // This will be filled when you enable the `enableExtendedGiftInfo` option
    };
  
    // Receiver Details (can also be a guest broadcaster)
    receiverUserId: string;
  }
  

  export default GiftDetails